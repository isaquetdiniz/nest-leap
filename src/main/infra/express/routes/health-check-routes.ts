import { Router } from 'express';

import { adaptRoute } from '@/shared/infra/express/adapters';
import { HealthCheckController } from '@/shared/interface/http/controllers';

const healthCheckRouter = Router();

healthCheckRouter
  .route('/health-check')
  .get(adaptRoute(new HealthCheckController()));

export { healthCheckRouter };
