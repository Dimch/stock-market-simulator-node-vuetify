import {beforeEach, describe, expect, it, vi} from 'vitest';
import {createPinia, setActivePinia} from 'pinia';
import {createRateLimit} from '@/test/factories';
import {hexColor} from '@/helper';
import {createVChartStub, VChipStub} from '@/test/stubs/components';

describe('RateLimitCard', () => {
  let RateLimitCard;
  let mountWithApp;
  let VChartStub;

  beforeEach(async () => {
    vi.resetModules();
    setActivePinia(createPinia());

    VChartStub = createVChartStub();

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
      BarChart: {},
    }));

    vi.doMock('echarts/components', () => ({
      GridComponent: {},
      TooltipComponent: {},
    }));

    ({default: RateLimitCard} = await import('@/views/widgets/chart/RateLimitCard.vue'));
    ({mountWithApp} = await import('@/test/renderWithApp'));
  }, 30_000);

  it('renders duration text, chip state, and chart categories for a rate limit', async () => {
    const rateLimit = createRateLimit({
      title: 'Admin login',
      salt: '10/minute',
      value: 4,
      percentage: 0.9,
      size: 2,
      unit: 'minute',
      bucket: {
        unit: 'minute',
        width: 1,
      },
      data: [1, 3, 2],
    });

    const {wrapper} = await mountWithApp(RateLimitCard, {
      mountOptions: {
        props: {
          rateLimit,
          color: 'purple',
        },
        global: {
          stubs: {
            VChip: VChipStub,
          },
        },
      },
    });

    expect(wrapper.text()).toContain('Admin login');
    expect(wrapper.text()).toContain('10/minute');
    expect(wrapper.text()).toContain('/2 minutes');
    expect(wrapper.text()).toContain('90%');

    const chip = wrapper.get('[data-test="chip"]');
    expect(chip.attributes('data-color')).toBe('error');
    expect(chip.attributes('data-border')).toBe('error solid thin opacity-50');

    const chartProps = wrapper.getComponent({name: 'VChart'}).props();
    expect(chartProps.autoresize).toBe(true);
    expect(chartProps.option.xAxis.data).toEqual(['Now', '1 minute ago', '2 minutes ago']);
    expect(chartProps.option.series[0]).toMatchObject({
      data: [1, 3, 2],
      color: hexColor('purple'),
      type: 'bar',
    });
  });

  it('maps percentage thresholds to success and warning chip states', async () => {
    const {wrapper: successWrapper} = await mountWithApp(RateLimitCard, {
      mountOptions: {
        props: {
          rateLimit: createRateLimit({percentage: 0.4}),
        },
        global: {
          stubs: {
            VChip: VChipStub,
          },
        },
      },
    });

    const {wrapper: warningWrapper} = await mountWithApp(RateLimitCard, {
      mountOptions: {
        props: {
          rateLimit: createRateLimit({percentage: 0.6}),
        },
        global: {
          stubs: {
            VChip: VChipStub,
          },
        },
      },
    });

    expect(successWrapper.get('[data-test="chip"]').attributes('data-color')).toBe('success');
    expect(warningWrapper.get('[data-test="chip"]').attributes('data-color')).toBe('warning');
  });
});
