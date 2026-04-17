import express from 'express';
import helmet from 'helmet';
import pino from 'pino';
import PinoHttp from 'pino-http';
import {createApplicationRoutes} from './routes.js';

const logger = pino({name: 'backend/app'});

// Motivation:
// Being able to unit test application routes without starting backend Web server

export const createApplication = (createRoutes = createApplicationRoutes) => {
  const app = express();

  app.use(PinoHttp({logger}));
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  if (process.env.NODE_ENV !== 'production') {
    // trust first proxy
    app.set('trust proxy', 1);
  }

  createRoutes(app);

  // Custom server error handling.
  app.use((req, res) => {
    logger.warn(`404 Not Found: ${req.method} ${req.originalUrl}`);
    res.status(404).send('Oopsie...');
  });

  app.use((err, req, res, next) => {
    logger.error(err);
    // if (err.type === 'ForbiddenError') {
    if (err.status)
      return res.status(err.status).send(err.message);
    // }
    res.status(500).send('Oops...');
  });

  return app;
};
