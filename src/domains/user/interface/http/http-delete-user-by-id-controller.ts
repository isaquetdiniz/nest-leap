import {
  IDeleteUserByEmailInCloudRepository,
  IDeleteUserByIdRepository,
  IGetUserByEmailInCloudRepository,
  IGetUserByIdRepository,
} from '@/domains/user/usecases/repos';
import {
  UserNotFoundException,
} from '@/domains/user/usecases/exceptions';
import {
  DeleteUserByIdController,
} from '@/domains/user/interface/controllers';

import {
  HttpResponse,
  HttpController,
} from '@/shared/interface/http/protocols';
import {
  ok,
  notFound,
  badRequest,
  serverError,
} from '@/shared/interface/http/helpers';
import { ILoggerLocal } from '@/shared/protocols';
import { ValidationException } from '@/shared/helpers';
import { Validation } from '@/shared/interface/validation/protocols';

export interface HttpDeleteUserByIdRequest {
  id: string;
}

export class HttpDeleteUserByIdController implements HttpController {
  private controller: DeleteUserByIdController;
  private logger: ILoggerLocal;

  constructor(
    getUserByIdRepository: IGetUserByIdRepository,
    getUserByEmailInCloudRepository: IGetUserByEmailInCloudRepository,
    deleteUserByEmailInCloudRepository: IDeleteUserByEmailInCloudRepository,
    deleteUserByIdRepository: IDeleteUserByIdRepository,
    validation: Validation,
    logger: ILoggerLocal
  ) {
    this.controller = new DeleteUserByIdController(
      getUserByIdRepository,
      getUserByEmailInCloudRepository,
      deleteUserByEmailInCloudRepository,
      deleteUserByIdRepository,
      validation,
      logger
    );

    this.logger = logger.child({ httpController: 'delete-user-by-id' });
  }

  async handle(httpRequest: HttpDeleteUserByIdRequest): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest });

    const { id } = httpRequest;

    try {
      await this.controller.execute({ id });

      this.logger.logDebug({ message: 'User deleted', data: { id } });

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
