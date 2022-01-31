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
import { IUuidGenerator } from '@/shared/protocols';

export interface HttpCreateUserRequest {
  name: string;
  email: string;
  isAdmin?: boolean;
}

export class HttpCreateUserController implements HttpController {
  private controller: CreateUserController;

  constructor(
    getUserByEmailRepository: IGetUserByEmailRepository,
    getUserByEmailInCloudRepository: IGetUserByEmailInCloudRepository,
    uuidGenerator: IUuidGenerator,
    saveUserRepository: ISaveUserRepository,
    saveUserInCloudRepository: ISaveUserInCloudRepository,
    deleteUserByIdRepository: IDeleteUserByIdRepository,
    validation: Validation
  ) {
    this.controller = new CreateUserController(
      getUserByEmailRepository,
      getUserByEmailInCloudRepository,
      uuidGenerator,
      saveUserRepository,
      saveUserInCloudRepository,
      deleteUserByIdRepository,
      validation
    );
  }

  async handle(httpRequest: HttpCreateUserRequest): Promise<HttpResponse> {
    const { name, email, isAdmin } = httpRequest;

    try {
      const userCreated = await this.controller.execute({
        name,
        email,
        isAdmin,
      });

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
