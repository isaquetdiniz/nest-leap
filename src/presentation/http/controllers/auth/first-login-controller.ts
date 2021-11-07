import { Controller, HttpResponse } from '@/presentation/http/protocols';

import {
  badRequest,
  conflict,
  ok,
  serverError,
} from '@/presentation/http/helpers/http-helper';

import { Validation } from '@/presentation/validation/protocols';
import { FirstLoginUsecase } from '@/application/usecases/auth';
import { FirstLoginCloudServiceError } from '@/application/errors/services/auth';
import { FirstLoginInCloudProviderError } from '@/application/errors/cloud/auth';

export class FirstLoginController implements Controller {
  private readonly validation: Validation;
  private readonly firstLoginUsecase: FirstLoginUsecase;

  constructor(validation: Validation, firstLoginUsecase: FirstLoginUsecase) {
    this.validation = validation;
    this.firstLoginUsecase = firstLoginUsecase;
  }

  async handle(
    httpRequest: FirstLoginController.Request
  ): Promise<HttpResponse> {
    try {
      const hasError = this.validation.validate(httpRequest);

      if (hasError) return badRequest(hasError);

      const { accessToken, refreshToken } =
        await this.firstLoginUsecase.firstLogin(httpRequest);

      return ok({ accessToken, refreshToken });
    } catch (error) {
      const catchedError = error as Error;

      if (
        error instanceof FirstLoginInCloudProviderError ||
        error instanceof FirstLoginCloudServiceError
      ) {
        return conflict(catchedError);
      }

      return serverError(catchedError);
    }
  }
}

export namespace FirstLoginController {
  export type Request = FirstLoginUsecase.Params;
}
