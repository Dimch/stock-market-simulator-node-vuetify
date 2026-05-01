import {beforeEach, describe, expect, it, vi} from 'vitest';
import {createModelValueButtonStub, createPropTextStub} from '@/test/stubs/widgets';

const StockPriceRangeStub = createPropTextStub({
  name: 'StockPriceRange',
  propName: 'ticker',
  testId: 'chart-ticker',
});

const StockListStub = createModelValueButtonStub({
  name: 'StockList',
  testId: 'stock-list',
  nextValue: 'ACME',
});

describe('MarketDashboard', () => {
  let MarketDashboard;
  let mountWithApp;

  beforeEach(async () => {
    vi.resetModules();

    vi.doMock('@/views/widgets/chart/StockPriceRange.vue', () => ({
      default: StockPriceRangeStub,
    }));

    vi.doMock('@/views/widgets/StockList.vue', () => ({
      default: StockListStub,
    }));

    ({default: MarketDashboard} = await import('@/views/dashboards/MarketDashboard.vue'));
    ({mountWithApp} = await import('@/test/renderWithApp'));
  }, 30_000);

  it('wires the selected ticker from the stock list into the chart widget', async () => {
    const {wrapper} = await mountWithApp(MarketDashboard);

    expect(wrapper.get('[data-test="chart-ticker"]').text()).toBe('ZVEX');
    expect(wrapper.get('[data-test="stock-list"]').text()).toBe('ZVEX');

    await wrapper.get('[data-test="stock-list"]').trigger('click');

    expect(wrapper.get('[data-test="chart-ticker"]').text()).toBe('ACME');
  });
});
