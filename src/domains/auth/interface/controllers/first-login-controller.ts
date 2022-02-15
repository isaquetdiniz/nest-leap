import { Validation } from '@/shared/interface/validation/protocols';
import { ValidationException } from '@/shared/helpers';

import {
  AccessDTO,
  AuthUserDTO,
  FirstLoginUsecase,
  IFirstLoginInCloudGateway,
  IGetAuthUserByEmailInCloudGateway,
  IGetAuthUserByEmailRepository,
  ILoginInCloudGateway,
  AuthUserTransformer,
} from '@/domains/auth';
import { ILoggerLocal } from '@/shared/protocols';

export interface FirstLoginRequest {
  email: string;
  newPassword: string;
  temporaryPassword: string;
}

export type FirstLoginResponse = {
  access: AccessDTO;
  authUser: AuthUserDTO;
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

    const accessDTO = {
      accessToken: access.accessToken,
      refreshToken: access.refreshToken,
    };

    const authUserDTO = AuthUserTransformer.generateDTO(authUser);

    this.logger.logDebug({
      message: 'Auth User made first login',
      data: authUser,
    });

    return { access: accessDTO, authUser: authUserDTO };
  }
}
