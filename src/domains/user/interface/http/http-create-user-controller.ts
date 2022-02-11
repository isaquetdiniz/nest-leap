import {
  CreateUserController,
  IDeleteUserByIdRepository,
  IGetUserByEmailInCloudRepository,
  IGetUserByEmailRepository,
  ISaveUserInCloudRepository,
  ISaveUserRepository,
  UserAlreadyExistsException,
} from '@/domains/user';
import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import { Validation } from '@/shared/interface/validation/protocols';
import { badRequest, ok, serverError } from '@/shared/interface/http/helpers';
import { ValidationException } from '@/shared/helpers';
import { ILoggerLocal, IUuidGenerator } from '@/shared/protocols';

export interface HttpCreateUserRequest {
  name: string;
  email: string;
  isAdmin?: boolean;
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

    const { name, email, isAdmin } = httpRequest;

    try {
      const userCreated = await this.controller.execute({
        name,
        email,
        isAdmin,
      });

      this.logger.logDebug({ message: 'User created', data: userCreated });

      return ok(userCreated);
    } catch (error) {
      if (error instanceof ValidationException) {
        return badRequest(error);
      }

      if (error instanceof UserAlreadyExistsException) {
        return badRequest(error);
      }

      return serverError(error as Error);
    }
  }
}
