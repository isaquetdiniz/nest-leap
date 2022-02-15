import {
  badRequest,
  notFound,
  ok,
  serverError,
} from '@/shared/interface/http/helpers';
import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import { Validation } from '@/shared/interface/validation/protocols';
import {
  IGetUserByIdRepository,
  IUpdateUserRepository,
  UpdateUserByIdController,
  UserNotFoundException,
} from '@/domains/user';
import { ValidationException } from '@/shared/helpers';
import { ILoggerLocal } from '@/shared/protocols';
import { CognitoException } from '@/shared/infra/cognito';

export interface HttpUpdateUserByIdRequest {
  id: string;
  name?: string;
  isAdmin?: boolean;
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

    const { id, name, isAdmin, enabled } = httpRequest;

    const request = {
      id,
      paramsToUpdate: {
        name,
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
