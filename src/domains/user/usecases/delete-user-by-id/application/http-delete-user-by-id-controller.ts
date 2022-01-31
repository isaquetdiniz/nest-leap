import {
  DeleteUserByIdController,
  IDeleteUserByEmailInCloudRepository,
  IDeleteUserByIdRepository,
  IGetUserByEmailInCloudRepository,
  IGetUserByIdRepository,
  UserNotFoundException,
} from '@/domains/user';
import {
  HttpController,
  HttpResponse,
} from '@/application/http-server/protocols';
import { Validation } from '@/application/validation/protocols';
import {
  badRequest,
  notFound,
  ok,
  serverError,
} from '@/application/http-server/helpers';
import { ValidationException } from '@/shared/helpers';

export interface HttpDeleteUserByIdRequest {
  id: string;
}

export class HttpDeleteUserByIdController implements HttpController {
  private controller: DeleteUserByIdController;

  constructor(
    getUserByIdRepository: IGetUserByIdRepository,
    getUserByEmailInCloudRepository: IGetUserByEmailInCloudRepository,
    deleteUserByEmailInCloudRepository: IDeleteUserByEmailInCloudRepository,
    deleteUserByIdRepository: IDeleteUserByIdRepository,
    validation: Validation
  ) {
    this.controller = new DeleteUserByIdController(
      getUserByIdRepository,
      getUserByEmailInCloudRepository,
      deleteUserByEmailInCloudRepository,
      deleteUserByIdRepository,
      validation
    );
  }

  async handle(httpRequest: HttpDeleteUserByIdRequest): Promise<HttpResponse> {
    const { id } = httpRequest;

    try {
      await this.controller.execute({ id });

      return ok();
    } catch (error) {
      if (error instanceof ValidationException) {
        return badRequest(error);
      }

      if (error instanceof UserNotFoundException) {
        return notFound(error);
      }

      return serverError(error as Error);
    }
  }
}
