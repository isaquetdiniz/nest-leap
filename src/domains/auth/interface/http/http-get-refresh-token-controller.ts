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
import { ILoggerLocal } from '@/shared/protocols';

export interface HttpGetRefreshTokenRequest {
  refreshToken: string;
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

    const { refreshToken } = httpRequest;

    try {
      const { accessToken, refreshToken: newRefreshToken } =
        await this.controller.execute({
          refreshToken,
        });

      this.logger.logDebug({ message: 'Token getted by refresh' });

      return ok({ accessToken, refreshToken: newRefreshToken });
    } catch (error) {
      if (error instanceof ValidationException) {
        return badRequest(error);
      }

      return serverError(error as Error);
    }
  }
}
