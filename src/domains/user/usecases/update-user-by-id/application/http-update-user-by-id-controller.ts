import {
  badRequest,
  notFound,
  ok,
  serverError,
} from '@/application/http-server/helpers';
import {
  HttpController,
  HttpResponse,
} from '@/application/http-server/protocols';
import { Validation } from '@/application/validation/protocols';
import {
  IGetUserByIdRepository,
  IUpdateUserRepository,
  UpdateUserByIdController,
  UserNotFoundException,
} from '@/domains/user';
import { ValidationException } from '@/shared/helpers';

export interface HttpUpdateUserByIdRequest {
  id: string;
  name?: string;
  isAdmin?: boolean;
  isEnabled?: boolean;
}

export class HttpUpdateUserByIdUsecase implements HttpController {
  private controller: UpdateUserByIdController;

  constructor(
    getUserByIdRepository: IGetUserByIdRepository,
    updateUserRepository: IUpdateUserRepository,
    validation: Validation
  ) {
    this.controller = new UpdateUserByIdController(
      getUserByIdRepository,
      updateUserRepository,
      validation
    );
  }

  async handle(httpRequest: HttpUpdateUserByIdRequest): Promise<HttpResponse> {
    const { id, name, isAdmin, isEnabled } = httpRequest;

    const request = {
      id,
      paramsToUpdate: {
        name,
        isAdmin,
        isEnabled,
      },
    };

    try {
      const userUpdated = await this.controller.execute(request);

      return ok(userUpdated);
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
