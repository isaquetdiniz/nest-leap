import {
  IGetUserByIdRepository,
  IUpdateUserRepository,
} from '@/domains/user/usecases/repos';
import {
  UserNotFoundException,
} from '@/domains/user/usecases/exceptions';
import {
  UpdateUserByIdController,
} from '@/domains/user/interface/controllers';

import {
  ok,
  notFound,
  badRequest,
  serverError,
} from '@/shared/interface/http/helpers';
import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import { ILoggerLocal } from '@/shared/protocols';
import { ValidationException } from '@/shared/helpers';
import { Validation } from '@/shared/interface/validation/protocols';

export interface HttpUpdateUserByIdRequest {
  id: string;
  name?: string;
  email?: string;
  is_admin?: boolean;
  enabled?: boolean;
}

export class HttpUpdateUserByIdController implements HttpController {
  private controller: UpdateUserByIdController;
  private logger: ILoggerLocal;

  constructor(
    getUserByIdRepository: IGetUserByIdRepository,
    updateUserRepository: IUpdateUserRepository,
    validation: Validation,
    logger: ILoggerLocal
  ) {
    this.controller = new UpdateUserByIdController(
      getUserByIdRepository,
      updateUserRepository,
      validation,
      logger
    );

    this.logger = logger.child({ httpController: 'update-user-by-id' });
  }

  async handle(httpRequest: HttpUpdateUserByIdRequest): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request received', data: httpRequest });

    const { id, name, is_admin: isAdmin, enabled, email } = httpRequest;

    const request = {
      id,
      paramsToUpdate: {
        name,
        email,
        isAdmin,
        enabled,
      },
    };

    try {
      const userUpdated = await this.controller.execute(request);

      this.logger.logDebug({ message: 'User updated', data: userUpdated });

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
