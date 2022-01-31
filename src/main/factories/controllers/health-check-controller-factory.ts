import { Controller } from '@/application/http-server/protocols';
import { HealthCheckController } from '@/shared/interface/http/controllers';

export const makeHealthCheckController = (): Controller => {
  const healthCheckController = new HealthCheckController();

  return healthCheckController;
};
