import { adaptRoute } from '@/main/adapters';

import { makeCreateUserController } from '@/main/factories/controllers/user';

import { Router } from 'express';

export default (router: Router): void => {
  router.route('/user/:id?').post(adaptRoute(makeCreateUserController()));
};
