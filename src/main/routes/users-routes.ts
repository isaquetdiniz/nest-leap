import { adaptRoute } from '@/main/adapters';

import {
  makeCreateUserController,
  makeDeleteUserController,
  makeListUsersController,
  makeUpdateUserController,
} from '@/main/factories/controllers/user';

import { Router } from 'express';

export default (router: Router): void => {
  router
    .route('/users/:id?')
    .get(adaptRoute(makeListUsersController()))
    .post(adaptRoute(makeCreateUserController()))
    .patch(adaptRoute(makeUpdateUserController()))
    .delete(adaptRoute(makeDeleteUserController()));
};
