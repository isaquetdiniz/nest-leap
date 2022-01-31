import { Controller } from '@/application/http-server/protocols';
import { makeLogControllerDecorator } from '@/main/factories/controllers';
import { makeLoginInCloudUsecase } from '@/main/factories/usecases/auth';
import { makeLoginValidation } from '@/domains/auth/interface/validation/auth';
import { LoginController } from '@/application/http-server/controllers/auth';

export const makeLoginController = (): Controller => {
  const loginUsecase = makeLoginInCloudUsecase();

  const validation = makeLoginValidation();

  const loginController = new LoginController(validation, loginUsecase);

  const loginControllerWithLogDecorator =
    makeLogControllerDecorator(loginController);

  return loginControllerWithLogDecorator;
};
