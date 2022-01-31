import { Router } from 'express';

import { adaptRoute } from '@/shared/infra/express/adapters';

import { makeHealthCheckController } from '@/main/factories/controllers';

export default (router: Router): void => {
  router.get('/health-check', adaptRoute(makeHealthCheckController()));
};
