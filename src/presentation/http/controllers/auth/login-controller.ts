import { Controller, HttpResponse } from '@/presentation/http/protocols';

import {
  badRequest,
  conflict,
  ok,
  serverError,
} from '@/presentation/http/helpers/http-helper';

import { Validation } from '@/presentation/validation/protocols';
import { LoginUsecase } from '@/application/usecases/auth';
import { LoginCloudServiceError } from '@/application/errors/services/auth';
import { LoginInCloudProviderError } from '@/application/errors/cloud/auth';
import { ListUserInCloudProviderError } from '@/application/errors/cloud/user';

export class LoginController implements Controller {
  private readonly validation: Validation;
  private readonly loginUsecase: LoginUsecase;

  constructor(validation: Validation, createUserUsecase: LoginUsecase) {
    this.validation = validation;
    this.loginUsecase = createUserUsecase;
  }

  async handle(httpRequest: LoginController.Request): Promise<HttpResponse> {
    try {
      const hasError = this.validation.validate(httpRequest);

      if (hasError) return badRequest(hasError);

      const { accessToken, refreshToken, user } = await this.loginUsecase.login(
        httpRequest
      );

      return ok({ accessToken, refreshToken, user });
    } catch (error) {
      const catchedError = error as Error;

      if (
        error instanceof LoginCloudServiceError ||
        error instanceof LoginInCloudProviderError ||
        error instanceof ListUserInCloudProviderError
      ) {
        return conflict(catchedError);
      }

      return serverError(catchedError);
    }
  }
}

export namespace LoginController {
  export type Request = LoginUsecase.Params;
}
