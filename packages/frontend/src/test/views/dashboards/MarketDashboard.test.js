import {beforeEach, describe, expect, it, vi} from 'vitest';
import {createModelValueButtonStub, createPropTextStub} from '@/test/stubs/widgets';

const SELECTORS = {
  chartTicker: '[data-test="chart-ticker"]',
  stockList: '[data-test="stock-list"]',
};

const TICKERS = {
  default: 'ZVEX',
  next: 'ACME',
};

const StockPriceRangeStub = createPropTextStub({
  name: 'StockPriceRange',
  propName: 'ticker',
  testId: 'chart-ticker',
});

const StockListStub = createModelValueButtonStub({
  name: 'StockList',
  testId: 'stock-list',
  nextValue: TICKERS.next,
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

    expect(wrapper.get(SELECTORS.chartTicker).text()).toBe(TICKERS.default);
    expect(wrapper.get(SELECTORS.stockList).text()).toBe(TICKERS.default);

    await wrapper.get(SELECTORS.stockList).trigger('click');

    expect(wrapper.get(SELECTORS.chartTicker).text()).toBe(TICKERS.next);
  });
});
