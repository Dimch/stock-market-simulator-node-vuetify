import {Router}  from 'express';
import {stockMarketService} from './service.js';
import {routes as authRoutes} from '../auth/index.js';

export const routes = () => {
  const router = Router();

  router.get('/stocks/hot', (_, res) => {
    res.json(stockMarketService.getTop(6));
  });

  router.use(...authRoutes('customer'));

  /**
   * GET /stock-market/stocks
   * Returns all stocks with current prices
   */
  router.get('/stocks', (_, res) => {
    const dashboard = stockMarketService.getDashboard();
    res.json(dashboard);
  });

  /**
   * POST /stock-market/tick
   * Simulate a market tick - update all stock prices
   * Body: {volatility?: number} (default 0.02 = 2%)
   */
  // router.post('/tick', (req, res) => {
  //   const volatility = req.body?.volatility ?? 0.02;
  //   const updates = stockMarketService.simulateTick(volatility);
  //   res.json({ 
  //     message: 'Market tick simulated',
  //     updates 
  //   });
  // });

  /**
   * GET /stock-market/history/:ticker
   * Returns price history for a stock
   * Query params: periods (default 60 = last 60 minutes)
   */
  router.get('/history/:ticker', (req, res) => {
    const ticker = req.params.ticker.toUpperCase();
    const periods = parseInt(req.query.periods) || 60;
    const history = stockMarketService.getPriceHistory(ticker, periods);
    
    if (!history) {
      return res.status(404).json({error: 'Stock not found'});
    }
    res.json(history);
  });

  /**
   * POST /stock-market/reset/:ticker
   * Reset stock price (for testing/admin only)
   * Body: {price: number}
   */
  // router.post('/reset/:ticker', (req, res) => {
  //   const ticker = req.params.ticker.toUpperCase();
  //   const price = req.body?.price;
    
  //   if (typeof price !== 'number' || price <= 0) {
  //     return res.status(400).json({error: 'Invalid price'});
  //   }
    
  //   const stock = stockMarketService.resetPrice(ticker, price);
  //   if (!stock) {
  //     return res.status(404).json({error: 'Stock not found'});
  //   }
  //   res.json(stock);
  // });


  return ['/stock-market', router];
};
