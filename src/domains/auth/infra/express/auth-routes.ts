import { adaptRoute } from '@/shared/infra/express/adapters';

import { Router } from 'express';

import {
  makeHttpLoginController,
  makeHttpGetRefreshTokenController,
  makeHttpFirstLoginController,
  makeHttpForgotPasswordController,
  makeHttpConfirmForgotPasswordController,
} from '@/domains/auth/factories/http';

const authRouter = Router();

authRouter.route('/auth/login').post(adaptRoute(makeHttpLoginController()));

authRouter
  .route('/auth/refresh-token')
  .post(adaptRoute(makeHttpGetRefreshTokenController()));

authRouter
  .route('/auth/first-access')
  .post(adaptRoute(makeHttpFirstLoginController()));

authRouter
  .route('/auth/forgot-password')
  .post(adaptRoute(makeHttpForgotPasswordController()));

authRouter
  .route('/auth/confirm-forgot-password')
  .post(adaptRoute(makeHttpConfirmForgotPasswordController()));

export { authRouter };
