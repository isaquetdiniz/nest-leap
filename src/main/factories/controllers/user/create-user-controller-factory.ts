import { Controller } from '@/application/http-server/protocols';
import { CreateUserController } from '@/application/http-server/controllers/user';

import { makeCreateUserUsecase } from '@/main/factories/usecases/user';
import { makeCreateUserValidation } from '@/main/factories/validation/user';
import { makeLogControllerDecorator } from '@/main/factories/controllers';

export const makeCreateUserController = (): Controller => {
  const createUserUsecase = makeCreateUserUsecase();

  const validation = makeCreateUserValidation();

  const createUserController = new CreateUserController(
    validation,
    createUserUsecase
  );

  const createUserControllerWithLogDecorator =
    makeLogControllerDecorator(createUserController);

  return createUserControllerWithLogDecorator;
};
