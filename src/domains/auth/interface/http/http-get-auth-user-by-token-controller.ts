import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import { Validation } from '@/shared/interface/validation/protocols';
import {
  badRequest,
  forbidden,
  ok,
  serverError,
  unauthorized,
} from '@/shared/interface/http/helpers';
import { ValidationException } from '@/shared/helpers';

import {
  AuthUserNotFoundException,
  IGetAuthUserByEmailRepository,
  GetAuthUserByTokenController,
  IGetAuthUserByTokenInCloudGateway,
  AuthUserNotFoundByTokenException,
} from '@/domains/auth';

export interface HttpGetAuthUserByTokenRequest {
  accessToken: string;
}

export class HttpGetAuthUserByTokenController implements HttpController {
  private controller: GetAuthUserByTokenController;

  constructor(
    getAuthUserByTokenInCloudGateway: IGetAuthUserByTokenInCloudGateway,
    getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    validation: Validation,
    private readonly authUserRole: 'ADMIN' | 'USER'
  ) {
    this.controller = new GetAuthUserByTokenController(
      getAuthUserByTokenInCloudGateway,
      getAuthUserByEmailRepository,
      validation
    );
  }

  async handle(
    httpRequest: HttpGetAuthUserByTokenRequest
  ): Promise<HttpResponse> {
    const { accessToken } = httpRequest;

    try {
      const authUser = await this.controller.execute({
        token: accessToken,
      });

      if (this.authUserRole === 'ADMIN' && !authUser.isAdmin) {
        return unauthorized();
      }

      return ok(authUser);
    } catch (error) {
      if (error instanceof ValidationException) {
        return badRequest(error);
      }

      if (
        error instanceof AuthUserNotFoundException ||
        error instanceof AuthUserNotFoundByTokenException
      ) {
        return forbidden(error);
      }

      return serverError(error as Error);
    }
  }
}
