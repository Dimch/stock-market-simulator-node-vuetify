import {beforeEach, describe, expect, it, vi} from 'vitest';
import {createTextStub} from '@/test/stubs/widgets';

const RateLimitChartsStub = createTextStub({
  name: 'RateLimitCharts',
  testId: 'rate-limit-charts',
  text: 'charts',
});

const RateLimitListStub = createTextStub({
  name: 'RateLimitList',
  testId: 'rate-limit-list',
  text: 'list',
});

describe('SecurityDashboard', () => {
  let SecurityDashboard;
  let mountWithApp;

  beforeEach(async () => {
    vi.resetModules();

    vi.doMock('@/views/widgets/chart/RateLimitCharts.vue', () => ({
      default: RateLimitChartsStub,
    }));

    vi.doMock('@/views/widgets/RateLimitList.vue', () => ({
      default: RateLimitListStub,
    }));

    ({default: SecurityDashboard} = await import('@/views/dashboards/SecurityDashboard.vue'));
    ({mountWithApp} = await import('@/test/renderWithApp'));
  }, 30_000);

  it('renders the rate-limit chart and list widgets', async () => {
    const {wrapper} = await mountWithApp(SecurityDashboard);

    expect(wrapper.get('[data-test="rate-limit-charts"]').text()).toBe('charts');
    expect(wrapper.get('[data-test="rate-limit-list"]').text()).toBe('list');
  });
});

