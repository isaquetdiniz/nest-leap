import { Express, Router } from 'express';
import { authRouter } from '@/domains/auth';
import { healthCheckRouter } from '@/main/infra/express/routes/health-check-routes';

export default (app: Express): void => {
  const router = Router();

  router.use(healthCheckRouter);
  router.use(authRouter);

  app.use(router);
};
