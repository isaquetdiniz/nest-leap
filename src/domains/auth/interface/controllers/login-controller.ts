import { LoginUsecase } from '@/domains/auth/usecases';
import { IGetAuthUserByEmailRepository } from '@/domains/auth/usecases/repos';
import {
  ILoginInCloudGateway,
  IGetAuthUserByEmailInCloudGateway,
} from '@/domains/auth/usecases/gateways';
import {
  AccessDefaultPresenter,
  AuthUserDefaultPresenter,
  AuthUserTransformers,
} from '@/domains/auth/interface/presenters';

import { ILoggerLocal } from '@/shared/protocols';
import { Validation } from '@/shared/interface/validation/protocols';
import { ValidationException } from '@/shared/helpers';

export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse = {
  access: AccessDefaultPresenter;
  authUser: AuthUserDefaultPresenter;
};

export class LoginController {
  private usecase: LoginUsecase;
  private logger: ILoggerLocal;

  constructor(
    getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    getAuthUserByEmailInCloudGateway: IGetAuthUserByEmailInCloudGateway,
    loginInCloudGateway: ILoginInCloudGateway,
    private readonly validation: Validation,
    logger: ILoggerLocal
  ) {
    this.usecase = new LoginUsecase(
      getAuthUserByEmailRepository,
      getAuthUserByEmailInCloudGateway,
      loginInCloudGateway,
      logger
    );

    this.logger = logger.child({ controller: 'login' });
  }

  async execute(request: LoginRequest): Promise<LoginResponse> {
    this.logger.logDebug({ message: 'Request Received', data: request });

    const hasError = this.validation.validate(request);

    if (hasError) {
      throw new ValidationException(hasError);
    }

    this.logger.logDebug({ message: 'Params Validated' });

    const { email, password } = request;

    const { access, authUser } = await this.usecase.execute({
      email,
      password,
    });

    const accessDefaultPresenter = {
      access_token: access.accessToken,
      refresh_token: access.refreshToken,
    };

    const authUserDefaultPresenter =
      AuthUserTransformers.generateDefaultPresenter(authUser);

    this.logger.logDebug({
      message: 'Auth User logged',
      data: authUserDefaultPresenter,
    });

    return {
      access: accessDefaultPresenter,
      authUser: authUserDefaultPresenter,
    };
  }
}
