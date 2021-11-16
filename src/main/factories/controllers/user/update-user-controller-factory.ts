import { Controller } from '@/application/http-server/protocols';
import { UpdateUserController } from '@/application/http-server/controllers/user';

import { makeUpdateUserUsecase } from '@/main/factories/usecases/user';
import { makeLogControllerDecorator } from '@/main/factories/controllers';
import { makeUpdateUserValidation } from '@/main/factories/validation/user';

export const makeUpdateUserController = (): Controller => {
  const updateUserUsecase = makeUpdateUserUsecase();

  const validation = makeUpdateUserValidation();

  const updateUserController = new UpdateUserController(
    validation,
    updateUserUsecase
  );

  const updateUserControllerWithLogDecorator =
    makeLogControllerDecorator(updateUserController);

  return updateUserControllerWithLogDecorator;
};
