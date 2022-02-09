import { Express, Router } from 'express';
import { authRouter } from '@/domains/auth';
import { healthCheckRouter } from '@/main/infra/express/routes/health-check-routes';
import { userRouter } from '@/domains/user';

export default (app: Express): void => {
  const router = Router();

  router.use(healthCheckRouter);
  router.use(authRouter);
  router.use(userRouter);

  app.use(router);
};
