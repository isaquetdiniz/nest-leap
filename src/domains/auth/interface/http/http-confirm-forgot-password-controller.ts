import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import { Validation } from '@/shared/interface/validation/protocols';
import { badRequest, ok, serverError } from '@/shared/interface/http/helpers';
import { ValidationException } from '@/shared/helpers';

import {
  AuthUserNotFoundException,
  IGetAuthUserByEmailInCloudRepository,
  IGetAuthUserByEmailRepository,
  AuthUserNotMadeFirstLoginException,
  ConfirmForgotPasswordController,
  IConfirmForgotPasswordInCloudGateway,
} from '@/domains/auth';

export interface HttpConfirmForgotPasswordRequest {
  email: string;
  verificationCode: string;
  newPassword: string;
}

export class HttpConfirmForgotPasswordController implements HttpController {
  private controller: ConfirmForgotPasswordController;

  constructor(
    getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    getAuthUserByEmailInCloudRepository: IGetAuthUserByEmailInCloudRepository,
    confirmforgotPasswordInCloudGateway: IConfirmForgotPasswordInCloudGateway,
    validation: Validation
  ) {
    this.controller = new ConfirmForgotPasswordController(
      getAuthUserByEmailRepository,
      getAuthUserByEmailInCloudRepository,
      confirmforgotPasswordInCloudGateway,
      validation
    );
  }

  async handle(
    httpRequest: HttpConfirmForgotPasswordRequest
  ): Promise<HttpResponse> {
    const { email, verificationCode, newPassword } = httpRequest;

    try {
      await this.controller.execute({
        email,
        verificationCode,
        newPassword,
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
