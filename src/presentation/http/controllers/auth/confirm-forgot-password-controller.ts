import { Controller, HttpResponse } from '@/presentation/http/protocols';

import {
  badRequest,
  conflict,
  ok,
  serverError,
} from '@/presentation/http/helpers/http-helper';

import { Validation } from '@/presentation/validation/protocols';
import { ConfirmForgotPasswordUsecase } from '@/application/usecases/auth';
import { ConfirmForgotPasswordCloudServiceError } from '@/application/errors/services/auth';
import { ConfirmForgotPasswordInCloudProviderError } from '@/application/errors/cloud/auth';
import { ListUserInCloudProviderError } from '@/application/errors/cloud/user';

export class ConfirmForgotPasswordController implements Controller {
  private readonly validation: Validation;
  private readonly confirmConfirmForgotPasswordUsecase: ConfirmForgotPasswordUsecase;

  constructor(
    validation: Validation,
    confirmConfirmForgotPasswordUsecase: ConfirmForgotPasswordUsecase
  ) {
    this.validation = validation;
    this.confirmConfirmForgotPasswordUsecase =
      confirmConfirmForgotPasswordUsecase;
  }

  async handle(
    httpRequest: ConfirmForgotPasswordController.Request
  ): Promise<HttpResponse> {
    try {
      const hasError = this.validation.validate(httpRequest);

      if (hasError) return badRequest(hasError);

      const { accessToken, refreshToken } =
        await this.confirmConfirmForgotPasswordUsecase.confirmForgotPassword(
          httpRequest
        );

      return ok({ accessToken, refreshToken });
    } catch (error) {
      const catchedError = error as Error;

      if (
        error instanceof ConfirmForgotPasswordInCloudProviderError ||
        error instanceof ConfirmForgotPasswordCloudServiceError ||
        error instanceof ListUserInCloudProviderError
      ) {
        return conflict(catchedError);
      }

      return serverError(catchedError);
    }
  }
}

export namespace ConfirmForgotPasswordController {
  export type Request = ConfirmForgotPasswordUsecase.Params;
}
