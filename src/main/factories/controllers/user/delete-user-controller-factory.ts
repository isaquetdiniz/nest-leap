import { Controller } from '@/presentation/http/protocols';
import { DeleteUserController } from '@/presentation/http/controllers/user';

import { makeDeleteUserUsecase } from '@/main/factories/services/user';
import { makeDeleteUserValidation } from '@/main/factories/validation/user';
import { makeLogControllerDecorator } from '@/main/factories/controllers';

export const makeDeleteUserController = (): Controller => {
  const deleteUserUsecase = makeDeleteUserUsecase();

  const validation = makeDeleteUserValidation();

  const deleteUserController = new DeleteUserController(
    validation,
    deleteUserUsecase
  );

  const deleteUserControllerWithLogDecorator =
    makeLogControllerDecorator(deleteUserController);

  return deleteUserControllerWithLogDecorator;
};
