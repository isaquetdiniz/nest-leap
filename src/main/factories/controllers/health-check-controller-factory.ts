import { Controller } from '@/presentation/http/protocols';
import { HealthCheckController } from '@/presentation/http/controllers';

export const makeHealthCheckController = (): Controller => {
  const healthCheckController = new HealthCheckController();

  return healthCheckController;
};
