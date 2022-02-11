import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import { Validation } from '@/shared/interface/validation/protocols';
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from '@/shared/interface/http/helpers';
import { ValidationException } from '@/shared/helpers';

import {
  AuthUserNeedSetPasswordException,
  AuthUserNotFoundException,
  AuthUserNotMadeFirstLoginException,
  IGetAuthUserByEmailInCloudGateway,
  IGetAuthUserByEmailRepository,
  ILoginInCloudGateway,
  LoginController,
} from '@/domains/auth';
import { ILoggerLocal } from '@/shared/protocols';
import { CognitoException } from '@/shared/infra/cognito';

export interface HttpLoginRequest {
  email: string;
  password: string;
}

export class HttpLoginController implements HttpController {
  private controller: LoginController;
  private logger: ILoggerLocal;

  constructor(
    getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    getAuthUserByEmailInCloudGateway: IGetAuthUserByEmailInCloudGateway,
    loginInCloudGateway: ILoginInCloudGateway,
    validation: Validation,
    logger: ILoggerLocal
  ) {
    this.controller = new LoginController(
      getAuthUserByEmailRepository,
      getAuthUserByEmailInCloudGateway,
      loginInCloudGateway,
      validation,
      logger
    );

    this.logger = logger.child({ httpController: 'login' });
  }

  async handle(httpRequest: HttpLoginRequest): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest });

    const { email, password } = httpRequest;

    try {
      const { access, authUser } = await this.controller.execute({
        email,
        password,
      });

      this.logger.logDebug({ message: 'Auth User Logged', data: authUser });

      return ok({ access, authUser });
    } catch (error) {
      if (
        error instanceof ValidationException ||
        error instanceof AuthUserNotFoundException ||
        error instanceof AuthUserNotMadeFirstLoginException ||
        error instanceof AuthUserNeedSetPasswordException
      ) {
        return badRequest(error);
      }

      if (error instanceof CognitoException) {
        return unauthorized(error);
      }

      return serverError(error as Error);
    }
  }
}
