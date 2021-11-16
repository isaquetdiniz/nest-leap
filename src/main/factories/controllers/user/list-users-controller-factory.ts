import { Controller } from '@/application/http-server/protocols';
import { ListUsersController } from '@/application/http-server/controllers/user';

import { makeListUsersUsecase } from '@/main/factories/usecases/user';
import { makeLogControllerDecorator } from '@/main/factories/controllers';
import { makeListUsersValidation } from '@/main/factories/validation/user';

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
