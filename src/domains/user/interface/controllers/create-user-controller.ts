import { Validation } from '@/shared/interface/validation/protocols';
import {
  IDeleteUserByIdRepository,
  IGetUserByEmailInCloudRepository,
  UserDTO,
  CreateUserUsecase,
  IGetUserByEmailRepository,
  ISaveUserRepository,
  ISaveUserInCloudRepository,
  UserTransformer,
} from '@/domains/user';
import { ValidationException } from '@/shared/helpers';
import { ILoggerLocal, IUuidGenerator } from '@/shared/protocols';

export interface CreateUserRequest {
  name: string;
  email: string;
  isAdmin?: boolean;
}

export type CreateUserResponse = UserDTO;

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

    const userCreatedDTO = UserTransformer.generateDTO(userCreated);

    this.logger.logDebug({ message: 'User created', data: userCreatedDTO });

    return userCreatedDTO;
  }
}
