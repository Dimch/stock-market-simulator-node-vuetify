import {Router} from 'express';
import session from "express-session";
import passport from 'passport';
import {csrfSync} from 'csrf-sync';
import cors from 'cors';

// import all routes
import {routes as adminRoutes} from './admin_services/index.js';
import {routes as stockMarketRoutes} from './stock_market/index.js';

const {csrfSynchronisedProtection} = csrfSync({
  errorConfig: {
    statusCode: 419,
    message: 'invalid csrf token',
    code: 'EBADCSRFTOKEN',
  },
});

export const createApplicationRoutes = (app) => {
  const router = Router();

  app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }));

  // NOTE: for application to function in development environment all routes
  //  should be added to vite.config.js server.proxy configuration.

  // api routes that do not require csrf protection
  // app.use('/api', {}); // should use router here

  // health check, returns 200 OK
  app.get('/health', (_, res) => res.send());

  // From here on - authenticated routes
  app.use(session({
    path: '/',
    name: 'cookieJar',
    httpOnly: true,
    secure: true,
    maxAge: 30 * 60 * 1000,         // 30 minutes
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: true,
  }));
  app.use(passport.session());
  app.use(csrfSynchronisedProtection);
  app.get('/csrf-token', (req, res) => res.json({csrfToken: req.csrfToken()}));
  
  app.use(...adminRoutes());
  app.use(...stockMarketRoutes());

  app.use(passport.authenticate('session'));
  // authenticated routes go here
};
