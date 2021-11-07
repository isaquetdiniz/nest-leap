import { adaptRoute } from '@/main/adapters';

import {
  makeFirstFirstLoginController,
  makeForgotPasswordController,
  makeLoginController,
} from '@/main/factories/controllers/auth';

import { Router } from 'express';

export default (router: Router): void => {
  router.route('/auth/login').post(adaptRoute(makeLoginController()));

  router
    .route('/auth/first-login')
    .post(adaptRoute(makeFirstFirstLoginController()));

  router
    .route('/auth/forgot-password')
    .post(adaptRoute(makeForgotPasswordController()));
};
