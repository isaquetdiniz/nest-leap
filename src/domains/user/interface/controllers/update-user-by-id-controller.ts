import {
  UpdateUserByIdUsecase,
} from '@/domains/user/usecases';
import {
  IGetUserByIdRepository,
  IUpdateUserRepository,
} from '@/domains/user/usecases/repos';
import {
  UserDefaultPresenter,
  UserTransformers,
} from '@/domains/user/interface/presenters';

import { ILoggerLocal } from '@/shared/protocols';
import { ValidationException } from '@/shared/helpers';
import { Validation } from '@/shared/interface/validation/protocols';

export interface UpdateUserByIdRequest {
  id: string;
  paramsToUpdate: {
    name?: string;
    email?: string;
    isAdmin?: boolean;
    enabled?: boolean;
  };
}

export type UpdateUserByIdResponse = UserDefaultPresenter;

export class UpdateUserByIdController {
  private usecase: UpdateUserByIdUsecase;
  private logger: ILoggerLocal;

  constructor(
    getUserByIdRepository: IGetUserByIdRepository,
    updateUserRepository: IUpdateUserRepository,
    private readonly validation: Validation,
    logger: ILoggerLocal
  ) {
    this.usecase = new UpdateUserByIdUsecase(
      getUserByIdRepository,
      updateUserRepository,
      logger
    );

    this.logger = logger.child({ controller: 'update-user-by-id' });
  }

  async execute(
    request: UpdateUserByIdRequest
  ): Promise<UpdateUserByIdResponse> {
    this.logger.logDebug({ message: 'Request received', data: request });

    const { id, paramsToUpdate } = request;

    const { name, isAdmin, enabled, email } = paramsToUpdate;

    const hasErrors = this.validation.validate({
      id,
      name,
      email,
      isAdmin,
      enabled,
    });

    if (hasErrors) {
      throw new ValidationException(hasErrors);
    }

    this.logger.logDebug({ message: 'Params validated' });

    const userUpdated = await this.usecase.execute({ id, paramsToUpdate });

    this.logger.logDebug({ message: 'User updated', data: userUpdated });

    const userPresenter = UserTransformers.generateDefaultTransformer(userUpdated);

    return userPresenter;
  }
}
