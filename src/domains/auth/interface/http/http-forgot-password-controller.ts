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
  ForgotPasswordController,
  IForgotPasswordInCloudGateway,
  AuthUserNotMadeFirstLoginException,
} from '@/domains/auth';
import { ILoggerLocal } from '@/shared/protocols';

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
        error instanceof AuthUserNotMadeFirstLoginException
      ) {
        return badRequest(error);
      }

      return serverError(error as Error);
    }
  }
}
