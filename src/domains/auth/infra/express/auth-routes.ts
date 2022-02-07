import { adaptRoute } from '@/shared/infra/express/adapters';

import { Router } from 'express';

import {
  makeHttpLoginController,
  makeHttpGetRefreshTokenController,
  makeHttpFirstLoginController,
  makeHttpForgotPasswordController,
  makeHttpConfirmForgotPasswordController,
} from '@/domains/auth';

const authRouter = Router();

authRouter.route('/auth/login').post(adaptRoute(makeHttpLoginController()));

authRouter
  .route('/auth/refresh_token')
  .post(adaptRoute(makeHttpGetRefreshTokenController()));

authRouter
  .route('/auth/first_access')
  .post(adaptRoute(makeHttpFirstLoginController()));

authRouter
  .route('/auth/forgot_password')
  .post(adaptRoute(makeHttpForgotPasswordController()));

authRouter
  .route('/auth/confirm_forgot_password')
  .post(adaptRoute(makeHttpConfirmForgotPasswordController()));

export { authRouter };
