import {beforeEach, describe, expect, it, vi} from 'vitest';
import {ref} from 'vue';
import {createPinia, setActivePinia} from 'pinia';
import {createStock} from '@/test/factories';
import {UiTitleCardStub} from '@/test/stubs/components';
import {createVCheckboxStub, createVDataTableStub} from '@/test/stubs/tables';

const VCheckboxStub = createVCheckboxStub();
const VDataTableStub = createVDataTableStub({testId: 'stock-table'});

describe('StockList', () => {
  let StockList;
  let mountWithApp;
  let refreshStock;
  let intervalSpy;
  let useQuerySpy;
  let getStocks;

  const stocks = [
    createStock(),
    createStock({
      ticker: 'ACME',
      name: 'Acme Dynamics',
      price: 72.5,
      changeAmount: -2.5,
      changePercent: -1.7,
    }),
  ];

  beforeEach(async () => {
    vi.resetModules();
    setActivePinia(createPinia());

    refreshStock = vi.fn();
    getStocks = vi.fn().mockResolvedValue(stocks);
    intervalSpy = vi.fn();
    useQuerySpy = vi.fn(() => ({
      data: ref(stocks),
      refresh: refreshStock,
    }));

    vi.doMock('@pinia/colada', () => ({
      PiniaColada: {
        install: () => {},
      },
      useQuery: useQuerySpy,
    }));

    vi.doMock('@/api/adminApi', () => ({
      useAdminApi: () => ({
        getStocks,
      }),
    }));

    vi.doMock('@/helper', () => ({
      useInterval: intervalSpy,
    }));

    ({default: StockList} = await import('@/views/widgets/StockList.vue'));
    ({mountWithApp} = await import('@/test/renderWithApp'));
  }, 30_000);

  it('renders stock rows, formats values, and registers a refresh interval', async () => {
    const {wrapper} = await mountWithApp(StockList, {
      mountOptions: {
        props: {
          modelValue: 'ZVEX',
        },
        global: {
          stubs: {
            UiTitleCard: UiTitleCardStub,
            VCheckbox: VCheckboxStub,
            VDataTable: VDataTableStub,
          },
        },
      },
    });

    expect(useQuerySpy).toHaveBeenCalledTimes(1);
    expect(useQuerySpy.mock.calls[0][0].key()).toEqual(['stocksLive']);
    await useQuerySpy.mock.calls[0][0].query();
    expect(getStocks).toHaveBeenCalledTimes(1);

    expect(wrapper.text()).toContain('Stocks Live');
    expect(wrapper.text()).toContain('ZVEX');
    expect(wrapper.text()).toContain('Zephyr Vex Technologies');
    expect(wrapper.text()).toContain('$150.00');
    expect(wrapper.text()).toContain('ACME');
    expect(wrapper.text()).toContain('-$2.50');
    expect(wrapper.text()).toContain('-1.7%');
    expect(wrapper.findAll('.text-success')).toHaveLength(2);
    expect(wrapper.findAll('.text-error')).toHaveLength(2);

    expect(intervalSpy).toHaveBeenCalledWith(refreshStock, 60 * 1000);
  });

  it('emits the newly selected ticker when a row is toggled', async () => {
    const {wrapper} = await mountWithApp(StockList, {
      mountOptions: {
        props: {
          modelValue: 'ZVEX',
        },
        global: {
          stubs: {
            UiTitleCard: UiTitleCardStub,
            VCheckbox: VCheckboxStub,
            VDataTable: VDataTableStub,
          },
        },
      },
    });

    await wrapper.findAll('[data-test="row-selector"]')[1].trigger('click');

    expect(wrapper.emitted('update:modelValue')).toEqual([['ACME']]);
  });
});

