import { Validation } from '@/presentation/validation/protocols';
import { LoadUserByTokenUsecase } from '@/application/usecases/auth';

import { Middleware, HttpResponse } from '@/presentation/http/protocols';

import {
  forbidden,
  ok,
  serverError,
  unauthorized,
} from '@/presentation/http/helpers/http-helper';
import {
  LoadUserByTokenCloudServiceError,
  LoadUserByTokenServiceError,
} from '@/application/errors/services/auth';
import { LoadUserByTokenInCloudProviderError } from '@/application/errors/cloud/auth';

export class AuthMiddleware implements Middleware {
  private readonly validation: Validation;
  private readonly loadUserByTokenUsecase: LoadUserByTokenUsecase;
  private readonly role: 'ADMIN' | 'USER';

  constructor(
    validation: Validation,
    loadUserByTokenUsecase: LoadUserByTokenUsecase,
    role: 'ADMIN' | 'USER'
  ) {
    this.validation = validation;
    this.loadUserByTokenUsecase = loadUserByTokenUsecase;
    this.role = role;
  }

  async handle(request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const hasErros = this.validation.validate(request);
      if (hasErros) return unauthorized(hasErros);

      const { accessToken } = request;

      const tokenWithoutBearer = accessToken.replace('Bearer ', '');

      const user = await this.loadUserByTokenUsecase.loadUser({
        token: tokenWithoutBearer,
      });

      if (!user) return forbidden();

      const userIsAdmin = user.getIsAdmin();

      if (!userIsAdmin && this.role === 'ADMIN') {
        return unauthorized();
      }

      return ok({ userRequester: user });
    } catch (error) {
      const catchedError = error as Error;

      if (
        error instanceof LoadUserByTokenCloudServiceError ||
        error instanceof LoadUserByTokenInCloudProviderError ||
        error instanceof LoadUserByTokenServiceError
      ) {
        return unauthorized(catchedError);
      }

      return serverError(catchedError);
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken: string;
  };
}
