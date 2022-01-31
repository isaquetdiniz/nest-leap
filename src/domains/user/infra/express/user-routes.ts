import { adaptRoute } from '@/shared/infra/express/adapters';

import { Router } from 'express';

import { authMiddleware } from '@/shared/infra/express/middlewares';

import {
  makeHttpCreateUserController,
  makeHttpDeleteUserByIdController,
  makeHttpGetUserByIdController,
  makeHttpGetUsersByFilterController,
  makeHttpUpdateUserByIdController,
} from '@/domains/user';

export default (router: Router): void => {
  router
    .route('/users')
    .post(authMiddleware('ADMIN'), adaptRoute(makeHttpCreateUserController()))
    .get(
      authMiddleware('USER'),
      adaptRoute(makeHttpGetUsersByFilterController())
    );

  router
    .route('/users/:id')
    .get(authMiddleware('USER'), adaptRoute(makeHttpGetUserByIdController()))
    .patch(
      authMiddleware('USER'),
      adaptRoute(makeHttpUpdateUserByIdController())
    )
    .delete(
      authMiddleware('ADMIN'),
      adaptRoute(makeHttpDeleteUserByIdController())
    );
};
