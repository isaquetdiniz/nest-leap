import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import { Validation } from '@/shared/interface/validation/protocols';
import { badRequest, ok, serverError } from '@/shared/interface/http/helpers';
import { ValidationException } from '@/shared/helpers';

import {
  AuthUserNotFoundException,
  IGetAuthUserByEmailInCloudGateway,
  IGetAuthUserByEmailRepository,
  AuthUserNotMadeFirstLoginException,
  ConfirmForgotPasswordController,
  IConfirmForgotPasswordInCloudGateway,
} from '@/domains/auth';
import { ILoggerLocal } from '@/shared/protocols';
import { CognitoException } from '@/shared/infra/cognito';

export interface HttpConfirmForgotPasswordRequest {
  email: string;
  verificationCode: string;
  newPassword: string;
}

export class HttpConfirmForgotPasswordController implements HttpController {
  private controller: ConfirmForgotPasswordController;
  private logger: ILoggerLocal;

  constructor(
    getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    getAuthUserByEmailInCloudGateway: IGetAuthUserByEmailInCloudGateway,
    confirmforgotPasswordInCloudGateway: IConfirmForgotPasswordInCloudGateway,
    validation: Validation,
    logger: ILoggerLocal
  ) {
    this.controller = new ConfirmForgotPasswordController(
      getAuthUserByEmailRepository,
      getAuthUserByEmailInCloudGateway,
      confirmforgotPasswordInCloudGateway,
      validation,
      logger
    );

    this.logger = logger.child({ httpController: 'confirm-forgot-password' });
  }

  async handle(
    httpRequest: HttpConfirmForgotPasswordRequest
  ): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest });

    const { email, verificationCode, newPassword } = httpRequest;

    try {
      await this.controller.execute({
        email,
        verificationCode,
        newPassword,
      });

      this.logger.logDebug({
        message: 'Auth User confirmed forgot password',
        data: httpRequest,
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
