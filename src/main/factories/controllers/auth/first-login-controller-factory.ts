import { Controller } from '@/presentation/http/protocols';
import { makeLogControllerDecorator } from '@/main/factories/controllers';
import { makeFirstLoginCloudService } from '@/main/factories/services/auth';
import { makeFirstLoginValidation } from '@/main/factories/validation/auth';
import { FirstLoginController } from '@/presentation/http/controllers/auth';

export const makeFirstFirstLoginController = (): Controller => {
  const firstLoginUsecase = makeFirstLoginCloudService();

  const validation = makeFirstLoginValidation();

  const firstLoginController = new FirstLoginController(
    validation,
    firstLoginUsecase
  );

  const firstLoginControllerWithLogDecorator =
    makeLogControllerDecorator(firstLoginController);

  return firstLoginControllerWithLogDecorator;
};
