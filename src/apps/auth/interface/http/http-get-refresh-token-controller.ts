import { IGetRefreshTokenInCloudGateway } from '@/domains/auth/usecases/gateways';
import { GetRefreshTokenController } from '@/domains/auth/interface/controllers';

import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import { ILoggerLocal } from '@/shared/protocols';
import { ValidationException } from '@/shared/helpers';
import { CognitoException } from '@/shared/infra/cognito';
import { Validation } from '@/shared/interface/validation/protocols';
import { badRequest, ok, serverError } from '@/shared/interface/http/helpers';

export interface HttpGetRefreshTokenRequest {
  refresh_token: string;
}

export class HttpGetRefreshTokenController implements HttpController {
  private controller: GetRefreshTokenController;
  private logger: ILoggerLocal;

  constructor(
    getRefreshTokenInCloudGateway: IGetRefreshTokenInCloudGateway,
    validation: Validation,
    logger: ILoggerLocal
  ) {
    this.controller = new GetRefreshTokenController(
      getRefreshTokenInCloudGateway,
      validation,
      logger
    );

    this.logger = logger.child({ httpController: 'get-refresh-token' });
  }

  async handle(httpRequest: HttpGetRefreshTokenRequest): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest });

    const { refresh_token: refreshToken } = httpRequest;

    try {
      const { access_token: accessToken, refresh_token: newRefreshToken } =
        await this.controller.execute({
          refreshToken,
        });

      this.logger.logDebug({ message: 'Token getted by refresh' });

      return ok({ accessToken, refreshToken: newRefreshToken });
    } catch (error) {
      if (
        error instanceof ValidationException ||
        error instanceof CognitoException
      ) {
        return badRequest(error);
      }

      return serverError(error as Error);
    }
  }
}
