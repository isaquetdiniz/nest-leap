import { Controller } from '@/presentation/http/protocols';
import { CreateUserController } from '@/presentation/http/controllers/user';

import { makeCreateUserUsecase } from '@/main/factories/services/user';
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
