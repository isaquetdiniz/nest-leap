import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import { Validation } from '@/shared/interface/validation/protocols';
import { badRequest, ok, serverError } from '@/shared/interface/http/helpers';
import { ValidationException } from '@/shared/helpers';

import {
  IGetRefreshTokenInCloudGateway,
  GetRefreshTokenController,
} from '@/domains/auth';

export interface HttpGetRefreshTokenRequest {
  refreshToken: string;
}

export class HttpGetRefreshTokenController implements HttpController {
  private controller: GetRefreshTokenController;

  constructor(
    getRefreshTokenInCloudGateway: IGetRefreshTokenInCloudGateway,
    validation: Validation
  ) {
    this.controller = new GetRefreshTokenController(
      getRefreshTokenInCloudGateway,
      validation
    );
  }

  async handle(httpRequest: HttpGetRefreshTokenRequest): Promise<HttpResponse> {
    const { refreshToken } = httpRequest;

    try {
      const { accessToken, refreshToken: newRefreshToken } =
        await this.controller.execute({
          refreshToken,
        });

      return ok({ accessToken, refreshToken: newRefreshToken });
    } catch (error) {
      if (error instanceof ValidationException) {
        return badRequest(error);
      }

      return serverError(error as Error);
    }
  }
}
