import { Validation } from '@/shared/interface/validation/protocols';
import { ValidationException } from '@/shared/helpers';

import {
  Access,
  AuthUser,
  IGetAuthUserByEmailInCloudGateway,
  IGetAuthUserByEmailRepository,
  ILoginInCloudGateway,
  LoginUsecase,
} from '@/domains/auth';
import { ILoggerLocal } from '@/shared/protocols';

export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse = {
  access: Access;
  authUser: AuthUser;
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

    this.logger.logDebug({ message: 'Auth User logged', data: authUser });

    return { access, authUser };
  }
}
