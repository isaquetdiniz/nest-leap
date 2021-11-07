import { Controller, HttpResponse } from '@/presentation/http/protocols';

import {
  badRequest,
  conflict,
  ok,
  serverError,
} from '@/presentation/http/helpers/http-helper';

import { Validation } from '@/presentation/validation/protocols';
import { ForgotPasswordUsecase } from '@/application/usecases/auth';
import { ForgotPasswordCloudServiceError } from '@/application/errors/services/auth';
import { ForgotPasswordInCloudProviderError } from '@/application/errors/cloud/auth';
import { ListUserInCloudProviderError } from '@/application/errors/cloud/user';

export class ForgotPasswordController implements Controller {
  private readonly validation: Validation;
  private readonly forgotPasswordUsecase: ForgotPasswordUsecase;

  constructor(
    validation: Validation,
    forgotPasswordUsecase: ForgotPasswordUsecase
  ) {
    this.validation = validation;
    this.forgotPasswordUsecase = forgotPasswordUsecase;
  }

  async handle(
    httpRequest: ForgotPasswordController.Request
  ): Promise<HttpResponse> {
    try {
      const hasError = this.validation.validate(httpRequest);

      if (hasError) return badRequest(hasError);

      await this.forgotPasswordUsecase.forgotPassword(httpRequest);

      return ok();
    } catch (error) {
      const catchedError = error as Error;

      if (
        error instanceof ForgotPasswordInCloudProviderError ||
        error instanceof ForgotPasswordCloudServiceError ||
        error instanceof ListUserInCloudProviderError
      ) {
        return conflict(catchedError);
      }

      return serverError(catchedError);
    }
  }
}

export namespace ForgotPasswordController {
  export type Request = ForgotPasswordUsecase.Params;
}
