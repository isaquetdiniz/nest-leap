import { Validation } from '@/shared/interface/validation/protocols';
import { ValidationException } from '@/shared/helpers';

import {
  Access,
  AuthUser,
  FirstLoginUsecase,
  IFirstLoginInCloudGateway,
  IGetAuthUserByEmailInCloudGateway,
  IGetAuthUserByEmailRepository,
  ILoginInCloudGateway,
} from '@/domains/auth';
import { ILoggerLocal } from '@/shared/protocols';

export interface FirstLoginRequest {
  email: string;
  newPassword: string;
  temporaryPassword: string;
}

export type FirstLoginResponse = {
  access: Access;
  authUser: AuthUser;
};

export class FirstLoginController {
  private usecase: FirstLoginUsecase;
  private logger: ILoggerLocal;

  constructor(
    getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    getAuthUserByEmailInCloudGateway: IGetAuthUserByEmailInCloudGateway,
    firstLoginInCloudGateway: IFirstLoginInCloudGateway,
    loginInCloudGateway: ILoginInCloudGateway,
    private readonly validation: Validation,
    logger: ILoggerLocal
  ) {
    this.usecase = new FirstLoginUsecase(
      getAuthUserByEmailRepository,
      getAuthUserByEmailInCloudGateway,
      firstLoginInCloudGateway,
      loginInCloudGateway,
      logger
    );

    this.logger = logger.child({ controller: 'first-login' });
  }

  async execute(request: FirstLoginRequest): Promise<FirstLoginResponse> {
    this.logger.logDebug({ message: 'Request Received', data: request });

    const hasError = this.validation.validate(request);

    if (hasError) {
      throw new ValidationException(hasError);
    }

    this.logger.logDebug({ message: 'Params validated' });

    const { email, newPassword, temporaryPassword } = request;

    const { access, authUser } = await this.usecase.execute({
      email,
      newPassword,
      temporaryPassword,
    });

    this.logger.logDebug({
      message: 'Auth User made first login',
      data: authUser,
    });

    return { access, authUser };
  }
}
