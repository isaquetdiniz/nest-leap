/* eslint-disable camelcase */
import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import { Validation } from '@/shared/interface/validation/protocols';
import { badRequest, ok, serverError } from '@/shared/interface/http/helpers';
import { ValidationException } from '@/shared/helpers';

import {
  AuthUserAlreadyMadeFirstLoginException,
  AuthUserNotFoundException,
  FirstLoginController,
  IFirstLoginInCloudGateway,
  IGetAuthUserByEmailInCloudGateway,
  IGetAuthUserByEmailRepository,
  ILoginInCloudGateway,
} from '@/domains/auth';
import { ILoggerLocal } from '@/shared/protocols';
import { CognitoException } from '@/shared/infra/cognito';

export interface HttpFirstLoginRequest {
  email: string;
  new_password: string;
  temporary_password: string;
}

export class HttpFirstLoginController implements HttpController {
  private controller: FirstLoginController;
  private logger: ILoggerLocal;

  constructor(
    getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    getAuthUserByEmailInCloudGateway: IGetAuthUserByEmailInCloudGateway,
    firstLoginInCloudGateway: IFirstLoginInCloudGateway,
    loginInCloudGateway: ILoginInCloudGateway,
    validation: Validation,
    logger: ILoggerLocal
  ) {
    this.controller = new FirstLoginController(
      getAuthUserByEmailRepository,
      getAuthUserByEmailInCloudGateway,
      firstLoginInCloudGateway,
      loginInCloudGateway,
      validation,
      logger
    );

    this.logger = logger.child({ httpController: 'first-login' });
  }

  async handle(httpRequest: HttpFirstLoginRequest): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest });

    const { email, new_password, temporary_password } = httpRequest;

    try {
      const {
        access: { accessToken, refreshToken },
        authUser,
      } = await this.controller.execute({
        email,
        newPassword: new_password,
        temporaryPassword: temporary_password,
      });

      this.logger.logDebug({
        message: 'Auth User made first login',
        data: authUser,
      });

      return ok({ accessToken, refreshToken, authUser });
    } catch (error) {
      if (
        error instanceof ValidationException ||
        error instanceof AuthUserNotFoundException ||
        error instanceof AuthUserAlreadyMadeFirstLoginException ||
        error instanceof CognitoException
      ) {
        return badRequest(error);
      }

      return serverError(error as Error);
    }
  }
}
