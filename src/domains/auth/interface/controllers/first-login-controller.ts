import { Validation } from '@/shared/interface/validation/protocols';
import { ValidationException } from '@/shared/helpers';

import {
  AccessDTO,
  AuthUserDTO,
  FirstLoginUsecase,
  IFirstLoginInCloudGateway,
  IGetAuthUserByEmailInCloudRepository,
  IGetAuthUserByEmailRepository,
  ILoginInCloudGateway,
  AuthUserTransformer,
} from '@/domains/auth';

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

  constructor(
    getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    getAuthUserByEmailInCloudRepository: IGetAuthUserByEmailInCloudRepository,
    firstLoginInCloudGateway: IFirstLoginInCloudGateway,
    loginInCloudGateway: ILoginInCloudGateway,
    private readonly validation: Validation
  ) {
    this.usecase = new FirstLoginUsecase(
      getAuthUserByEmailRepository,
      getAuthUserByEmailInCloudRepository,
      firstLoginInCloudGateway,
      loginInCloudGateway
    );
  }

  async execute(request: FirstLoginRequest): Promise<FirstLoginResponse> {
    const hasError = this.validation.validate(request);

    if (hasError) {
      throw new ValidationException(hasError);
    }

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

    return { access: accessDTO, authUser: authUserDTO };
  }
}
