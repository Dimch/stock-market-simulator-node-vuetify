import {Router} from 'express';
import passport from 'passport';
import fp from 'lodash/fp.js';
import {limitAdminLoginByIp, limitAdminLoginByUser} from './rate_limit_middleware.js';
const {map, pick} = fp;

const authMiddleware = strategyName => map(m => m(strategyName))([
  limitAdminLoginByIp,
  passport.authenticate.bind(passport),
  limitAdminLoginByUser,
]);

const pickUser = pick(['id', 'name', 'email', 'created_at']);

export const routes = authStrategy => {
  const auth = Router();

  auth.get('/',
    (req, res) => res.json({
      authenticated: Boolean(req.isAuthenticated()),
      user: pickUser(req.user) || null,
    }));

  auth.post('/',
    ...authMiddleware(authStrategy),
    (req, res) => res.json(pickUser(req.user)));

  auth.delete('/',
    (req, res) => req.logout(() => res.status(200).send()));

  return ['/auth', auth];
};
