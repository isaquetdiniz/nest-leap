import { adaptRoute } from '@/shared/infra/express/adapters';

import { Router } from 'express';

import { authMiddleware } from '@/main/infra/express/middlewares';

import {
  makeHttpCreateTesteRatinhoController,
  makeHttpDeleteTesteRatinhoByIdController,
  makeHttpGetTesteRatinhoByIdController,
  makeHttpGetTesteRatinhosByFilterController,
  makeHttpUpdateTesteRatinhoByIdController,
} from '@/domains/teste-ratinho';

const testeRatinhoRouter = Router();

testeRatinhoRouter
  .route('/teste-ratinhos')
  .post(adaptRoute(makeHttpCreateTesteRatinhoController()))
  .get(
    authMiddleware('USER'),
    adaptRoute(makeHttpGetTesteRatinhosByFilterController())
  );

testeRatinhoRouter
  .route('/teste-ratinhos/:id')
  .get(
    authMiddleware('USER'),
    adaptRoute(makeHttpGetTesteRatinhoByIdController())
  )
  .patch(
    authMiddleware('USER'),
    adaptRoute(makeHttpUpdateTesteRatinhoByIdController())
  )
  .delete(
    authMiddleware('ADMIN'),
    adaptRoute(makeHttpDeleteTesteRatinhoByIdController())
  );

export { testeRatinhoRouter };
