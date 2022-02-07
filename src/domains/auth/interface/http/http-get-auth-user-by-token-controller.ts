import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import { Validation } from '@/shared/interface/validation/protocols';
import { badRequest, ok, serverError } from '@/shared/interface/http/helpers';
import { ValidationException } from '@/shared/helpers';

import {
  AuthUserNotFoundException,
  IGetAuthUserByEmailRepository,
  GetAuthUserByTokenController,
  IGetAuthUserByTokenInCloudGateway,
  AuthUserNotFoundByTokenException,
} from '@/domains/auth';

export interface HttpGetAuthUserByTokenRequest {
  token: string;
}

export class HttpGetAuthUserByTokenController implements HttpController {
  private controller: GetAuthUserByTokenController;

  constructor(
    getAuthUserByTokenInCloudGateway: IGetAuthUserByTokenInCloudGateway,
    getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    validation: Validation
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
    const { token } = httpRequest;

    try {
      const authUser = await this.controller.execute({
        token,
      });

      return ok(authUser);
    } catch (error) {
      if (
        error instanceof ValidationException ||
        error instanceof AuthUserNotFoundException ||
        error instanceof AuthUserNotFoundByTokenException
      ) {
        return badRequest(error);
      }

      return serverError(error as Error);
    }
  }
}
