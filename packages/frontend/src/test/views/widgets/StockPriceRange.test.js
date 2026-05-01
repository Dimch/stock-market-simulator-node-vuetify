import {beforeEach, describe, expect, it, vi} from 'vitest';
import {nextTick, ref} from 'vue';
import {createPinia, setActivePinia} from 'pinia';
import {createVChartStub, UiTitleCardStub} from '@/test/stubs/components';

describe('StockPriceRange', () => {
  let StockPriceRange;
  let mountWithApp;
  let refreshStock;
  let intervalSpy;
  let useQuerySpy;
  let getStockPeriods;
  let queryConfig;
  let VChartStub;

  const stock = {
    name: 'Zephyr Vex Technologies',
    ticker: 'ZVEX',
    currentPrice: 150,
    changeAmount: 4.5,
    changePercent: 3.4,
    prices: [145, 147, 150],
    timeLabels: ['09:00', '09:30', '10:00'],
  };

  beforeEach(async () => {
    vi.resetModules();
    setActivePinia(createPinia());

    refreshStock = vi.fn();
    getStockPeriods = vi.fn().mockResolvedValue(stock);
    intervalSpy = vi.fn();
    useQuerySpy = vi.fn((config) => {
      queryConfig = config;
      return {
        data: ref(stock),
        refresh: refreshStock,
      };
    });

    VChartStub = createVChartStub();

    vi.doMock('@pinia/colada', () => ({
      PiniaColada: {
        install: () => {},
      },
      useQuery: useQuerySpy,
    }));

    vi.doMock('@/api/adminApi', () => ({
      useAdminApi: () => ({
        getStockPeriods,
      }),
    }));

    vi.doMock('@/helper', () => ({
      useInterval: intervalSpy,
    }));

    vi.doMock('vue-echarts', () => ({
      default: VChartStub,
    }));

    vi.doMock('echarts/core', () => ({
      use: vi.fn(),
    }));

    vi.doMock('echarts/renderers', () => ({
      SVGRenderer: {},
    }));

    vi.doMock('echarts/charts', () => ({
      LineChart: {},
    }));

    vi.doMock('echarts/components', () => ({
      GridComponent: {},
      TooltipComponent: {},
    }));

    ({default: StockPriceRange} = await import('@/views/widgets/chart/StockPriceRange.vue'));
    ({mountWithApp} = await import('@/test/renderWithApp'));
  }, 30_000);

  it('renders stock details, configures the chart, and registers refresh polling', async () => {
    const {wrapper} = await mountWithApp(StockPriceRange, {
      mountOptions: {
        props: {
          ticker: 'ZVEX',
        },
        global: {
          stubs: {
            UiTitleCard: UiTitleCardStub,
          },
        },
      },
    });

    expect(useQuerySpy).toHaveBeenCalledTimes(1);
    expect(queryConfig.key()).toEqual(['stockPriceRange', 'ZVEX', 60]);
    await queryConfig.query();
    expect(getStockPeriods).toHaveBeenCalledWith('ZVEX', 60);

    expect(wrapper.text()).toContain('Zephyr Vex Technologies');
    expect(wrapper.text()).toContain('$4.50 (3%)');
    expect(wrapper.text()).toContain('Current price: $150');
    expect(wrapper.find('.text-success').exists()).toBe(true);

    const chartProps = wrapper.getComponent({name: 'VChart'}).props();
    expect(chartProps.autoresize).toBe(true);
    expect(chartProps.option.darkMode).toBe(false);
    expect(chartProps.option.xAxis.data).toEqual(stock.timeLabels);
    expect(chartProps.option.series[0]).toMatchObject({
      name: 'ZVEX',
      type: 'line',
      data: stock.prices,
    });

    expect(intervalSpy).toHaveBeenCalledWith(refreshStock, 60 * 1000);
  });

  it('updates the selected period when the user chooses a different time range', async () => {
    const {wrapper} = await mountWithApp(StockPriceRange, {
      mountOptions: {
        props: {
          ticker: 'ZVEX',
        },
        global: {
          stubs: {
            UiTitleCard: UiTitleCardStub,
          },
        },
      },
    });

    const sixHourButton = wrapper.findAll('button').find(button => button.text() === '6 hours');
    await sixHourButton.trigger('click');
    await nextTick();

    expect(queryConfig.key()).toEqual(['stockPriceRange', 'ZVEX', 360]);
    await queryConfig.query();
    expect(getStockPeriods).toHaveBeenLastCalledWith('ZVEX', 360);
  });
});
