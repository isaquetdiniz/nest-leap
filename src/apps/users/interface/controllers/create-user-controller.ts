import { CreateUserUsecase } from '@/domains/user/usecases';
import {
  ISaveUserRepository,
  IGetUserByEmailRepository,
  IDeleteUserByIdRepository,
  ISaveUserInCloudRepository,
  IGetUserByEmailInCloudRepository,
} from '@/domains/user/usecases/repos';
import {
  UserDefaultPresenter,
  UserTransformers,
} from '@/domains/user/interface/presenters';

import { ValidationException } from '@/shared/helpers';
import { ILoggerLocal, IUuidGenerator } from '@/shared/protocols';
import { Validation } from '@/shared/interface/validation/protocols';

export interface CreateUserRequest {
  name: string;
  email: string;
  isAdmin?: boolean;
}

export type CreateUserResponse = UserDefaultPresenter;

export class CreateUserController {
  private usecase: CreateUserUsecase;
  private logger: ILoggerLocal;

  constructor(
    getUserByEmailRepository: IGetUserByEmailRepository,
    getUserByEmailInCloudRepository: IGetUserByEmailInCloudRepository,
    uuidGenerator: IUuidGenerator,
    saveUserRepository: ISaveUserRepository,
    saveUserInCloudRepository: ISaveUserInCloudRepository,
    deleteUserByIdRepository: IDeleteUserByIdRepository,
    private readonly validation: Validation,
    logger: ILoggerLocal
  ) {
    this.usecase = new CreateUserUsecase(
      getUserByEmailRepository,
      getUserByEmailInCloudRepository,
      uuidGenerator,
      saveUserRepository,
      saveUserInCloudRepository,
      deleteUserByIdRepository,
      logger
    );

    this.logger = logger.child({ controller: 'create-user' });
  }

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    this.logger.logDebug({ message: 'Request Received', data: request });

    const { name, email, isAdmin } = request;

    const hasError = this.validation.validate({
      name,
      email,
      isAdmin,
    });

    this.logger.logDebug({ message: 'Params validated' });

    if (hasError) {
      throw new ValidationException(hasError);
    }

    const userCreated = await this.usecase.execute({ name, email, isAdmin });

    this.logger.logDebug({ message: 'User created', data: userCreated });

    const userPresenter =
      UserTransformers.generateDefaultTransformer(userCreated);

    return userPresenter;
  }
}
