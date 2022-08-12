import {
  IDeleteUserByIdRepository,
  IGetUserByEmailInCloudRepository,
  IGetUserByEmailRepository,
  ISaveUserInCloudRepository,
  ISaveUserRepository,
} from '@/domains/user/usecases/repos';
import { UserAlreadyExistsException } from '@/domains/user/usecases/exceptions';
import { CreateUserController } from '@/domains/user/interface/controllers';

import {
  HttpResponse,
  HttpController,
} from '@/shared/interface/http/protocols';
import { ValidationException } from '@/shared/helpers';
import { ILoggerLocal, IUuidGenerator } from '@/shared/protocols';
import { Validation } from '@/shared/interface/validation/protocols';
import {
  badRequest,
  created,
  serverError,
} from '@/shared/interface/http/helpers';

export interface HttpCreateUserRequest {
  name: string;
  email: string;
  is_admin?: boolean;
}

export class HttpCreateUserController implements HttpController {
  private controller: CreateUserController;
  private logger: ILoggerLocal;

  constructor(
    getUserByEmailRepository: IGetUserByEmailRepository,
    getUserByEmailInCloudRepository: IGetUserByEmailInCloudRepository,
    uuidGenerator: IUuidGenerator,
    saveUserRepository: ISaveUserRepository,
    saveUserInCloudRepository: ISaveUserInCloudRepository,
    deleteUserByIdRepository: IDeleteUserByIdRepository,
    validation: Validation,
    logger: ILoggerLocal
  ) {
    this.controller = new CreateUserController(
      getUserByEmailRepository,
      getUserByEmailInCloudRepository,
      uuidGenerator,
      saveUserRepository,
      saveUserInCloudRepository,
      deleteUserByIdRepository,
      validation,
      logger
    );

    this.logger = logger.child({ httpController: 'create-user' });
  }

  async handle(httpRequest: HttpCreateUserRequest): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest });

    const { name, email, is_admin: isAdmin } = httpRequest;

    try {
      const userCreated = await this.controller.execute({
        name,
        email,
        isAdmin,
      });

      this.logger.logDebug({ message: 'User created', data: userCreated });

      return created(userCreated);
    } catch (error) {
      if (
        error instanceof ValidationException ||
        error instanceof UserAlreadyExistsException
      ) {
        return badRequest(error);
      }

      return serverError(error as Error);
    }
  }
}
