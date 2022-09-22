import { IGetAuthUserByEmailRepository } from '@/domains/auth/usecases/repos';
import {
  AuthUserNotFoundException,
  AuthUserNotMadeFirstLoginException,
} from '@/domains/auth/usecases/exceptions';
import {
  IForgotPasswordInCloudGateway,
  IGetAuthUserByEmailInCloudGateway,
} from '@/domains/auth/usecases/gateways';
import { ForgotPasswordController } from '@/domains/auth/interface/controllers';

import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import { ILoggerLocal } from '@/shared/protocols';
import { ValidationException } from '@/shared/helpers';
import { CognitoException } from '@/shared/infra/cognito';
import { Validation } from '@/shared/interface/validation/protocols';
import { badRequest, ok, serverError } from '@/shared/interface/http/helpers';

export interface HttpForgotPasswordRequest {
  email: string;
}

export class HttpForgotPasswordController implements HttpController {
  private controller: ForgotPasswordController;
  private logger: ILoggerLocal;

  constructor(
    getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    getAuthUserByEmailInCloudGateway: IGetAuthUserByEmailInCloudGateway,
    forgotPasswordInCloudGateway: IForgotPasswordInCloudGateway,
    validation: Validation,
    logger: ILoggerLocal
  ) {
    this.controller = new ForgotPasswordController(
      getAuthUserByEmailRepository,
      getAuthUserByEmailInCloudGateway,
      forgotPasswordInCloudGateway,
      validation,
      logger
    );

    this.logger = logger.child({ httpController: 'forgot-password' });
  }

  async handle(httpRequest: HttpForgotPasswordRequest): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest });

    const { email } = httpRequest;

    try {
      await this.controller.execute({
        email,
      });

      this.logger.logDebug({
        message: 'Auth User forgot password',
        data: email,
      });

      return ok();
    } catch (error) {
      if (
        error instanceof ValidationException ||
        error instanceof AuthUserNotFoundException ||
        error instanceof AuthUserNotMadeFirstLoginException ||
        error instanceof CognitoException
      ) {
        return badRequest(error);
      }

      return serverError(error as Error);
    }
  }
}
