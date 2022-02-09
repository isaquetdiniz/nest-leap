import express from 'express';

import setupMiddlewares from './middlewares';
import setupRoutes from './routes';

import { env } from '@/main/config';

const app = express();

(async () => {
  if (env.application.mode !== 'production') {
    await (async () => {
      (await import('./swagger.js')).default(app);
    })();
  }

  setupRoutes(app);
  setupMiddlewares(app);
})();

export default app;
