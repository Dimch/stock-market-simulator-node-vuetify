import {Router} from 'express';
import {routes as authRoutes} from '../auth/index.js';
import {rateLimitService} from './rate_limit_service.js';
import {stockMarketService} from '../stock_market/service.js';

export const routes = () => {
  const admin = Router();

  admin.use(...authRoutes('admin'));

  admin.get('/',
    (_, res) => res.send('Admin Services')); // stub route

  admin.get('/rate-limits',
    async (_, res) => res.json(await rateLimitService.getDashboard()));

  admin.get('/rate-limits/list',
    async (_, res) => res.json(await rateLimitService.getDashboard()));

  admin.get('/stocks',
    async (_, res) => res.json(await stockMarketService.getDashboard()));

  admin.get('/stocks/:ticker/:periods',
    async (req, res) => res.json(await stockMarketService.getPriceHistory(req.params.ticker, Number.parseInt(req.params.periods))));

  return ['/admin', admin];
};
