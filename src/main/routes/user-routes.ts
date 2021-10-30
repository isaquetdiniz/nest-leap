import { adaptRoute } from '@/main/adapters';

import {
  makeFirstAccessController,
  makeCreateUserController,
  makeDeleteUserController,
  makeListUserController,
  makeUpdateUserController,
  makeForgotPasswordController,
  makeConfirmForgotPasswordController,
} from '@/main/factories/controllers/user';

import { Router } from 'express';

import { uploadProfileImage, authMiddleware } from '@/main/middlewares';

export default (router: Router): void => {
  router.post('/user/first-access', adaptRoute(makeFirstAccessController()));

  router.post(
    '/user/forgot-password',
    adaptRoute(makeForgotPasswordController())
  );
  router.post(
    '/user/confirm-forgot-password',
    adaptRoute(makeConfirmForgotPasswordController())
  );

  router
    .route('/user/:id?')
    .get(authMiddleware(), adaptRoute(makeListUserController()))
    .post(
      authMiddleware(['admin', 'supervisor']),
      uploadProfileImage,
      adaptRoute(makeCreateUserController())
    )
    .patch(
      authMiddleware(),
      uploadProfileImage,
      adaptRoute(makeUpdateUserController())
    )
    .delete(authMiddleware(['admin']), adaptRoute(makeDeleteUserController()));
};
