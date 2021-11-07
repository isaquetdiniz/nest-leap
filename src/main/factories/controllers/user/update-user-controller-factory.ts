import { Controller } from '@/presentation/http/protocols';
import { UpdateUserController } from '@/presentation/http/controllers/user';

import { makeUpdateUserUsecase } from '@/main/factories/services/user';
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
