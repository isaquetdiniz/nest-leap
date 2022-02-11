import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import { Validation } from '@/shared/interface/validation/protocols';
import {
  badRequest,
  forbidden,
  ok,
  serverError,
  unauthorized,
} from '@/shared/interface/http/helpers';
import { ValidationException } from '@/shared/helpers';

import {
  AuthUserNotFoundException,
  IGetAuthUserByEmailRepository,
  GetAuthUserByTokenController,
  IGetAuthUserByTokenInCloudGateway,
  AuthUserNotFoundByTokenException,
} from '@/domains/auth';
import { ILoggerLocal } from '@/shared/protocols';

export interface HttpGetAuthUserByTokenRequest {
  accessToken: string;
}

export class HttpGetAuthUserByTokenController implements HttpController {
  private controller: GetAuthUserByTokenController;
  private logger: ILoggerLocal;

  constructor(
    getAuthUserByTokenInCloudGateway: IGetAuthUserByTokenInCloudGateway,
    getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    validation: Validation,
    private readonly authUserRole: 'ADMIN' | 'USER',
    logger: ILoggerLocal
  ) {
    this.controller = new GetAuthUserByTokenController(
      getAuthUserByTokenInCloudGateway,
      getAuthUserByEmailRepository,
      validation,
      logger
    );

    this.logger = logger.child({ httpController: 'get-auth-user-by-token' });
  }

  async handle(
    httpRequest: HttpGetAuthUserByTokenRequest
  ): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest });

    const { accessToken } = httpRequest;

    try {
      const authUser = await this.controller.execute({
        token: accessToken,
      });

      this.logger.logDebug({
        message: 'Auth User found by token',
        data: authUser,
      });

      if (this.authUserRole === 'ADMIN' && !authUser.isAdmin) {
        return unauthorized();
      }

      this.logger.logDebug({
        message: 'Auth User authorized',
        data: authUser,
      });

      return ok(authUser);
    } catch (error) {
      if (error instanceof ValidationException) {
        return badRequest(error);
      }

      if (
        error instanceof AuthUserNotFoundException ||
        error instanceof AuthUserNotFoundByTokenException
      ) {
        return forbidden(error);
      }

      return serverError(error as Error);
    }
  }
}
