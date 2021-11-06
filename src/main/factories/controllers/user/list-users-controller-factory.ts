import { Controller } from '@/presentation/http/protocols';
import { ListUsersController } from '@/presentation/http/controllers/user';

import { makeListUsersUsecase } from '@/main/factories/services/user';
import { makeLogControllerDecorator } from '@/main/factories/controllers';
import { makeListUsersValidation } from '@/main/factories/validation/user/list-users-validation-factory';

export const makeListUsersController = (): Controller => {
  const listUsersUsecase = makeListUsersUsecase();

  const validation = makeListUsersValidation();

  const listUsersController = new ListUsersController(
    validation,
    listUsersUsecase
  );

  const listUsersControllerWithLogDecorator =
    makeLogControllerDecorator(listUsersController);

  return listUsersControllerWithLogDecorator;
};
