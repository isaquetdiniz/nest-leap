import { Controller, HttpResponse } from '@/presentation/http/protocols';

import {
  badRequest,
  conflict,
  ok,
  serverError,
} from '@/presentation/http/helpers/http-helper';

import { Validation } from '@/presentation/validation/protocols';
import { RefreshTokenUsecase } from '@/application/usecases/auth';
import { RefreshTokenInCloudProviderError } from '@/application/errors/cloud/auth';

export class RefreshTokenController implements Controller {
  private readonly validation: Validation;
  private readonly refreshTokenUsecase: RefreshTokenUsecase;

  constructor(validation: Validation, createUserUsecase: RefreshTokenUsecase) {
    this.validation = validation;
    this.refreshTokenUsecase = createUserUsecase;
  }

  async handle(
    httpRequest: RefreshTokenController.Request
  ): Promise<HttpResponse> {
    try {
      const hasError = this.validation.validate(httpRequest);

      if (hasError) return badRequest(hasError);

      const { accessToken, refreshToken } =
        await this.refreshTokenUsecase.refresh(httpRequest);

      return ok({ accessToken, refreshToken });
    } catch (error) {
      const catchedError = error as Error;

      if (error instanceof RefreshTokenInCloudProviderError) {
        return conflict(catchedError);
      }

      return serverError(catchedError);
    }
  }
}

export namespace RefreshTokenController {
  export type Request = RefreshTokenUsecase.Params;
}
