import { Validation } from '@/shared/interface/validation/protocols';
import { ValidationException } from '@/shared/helpers';

import {
  AccessDTO,
  AuthUserDTO,
  IGetAuthUserByEmailInCloudRepository,
  IGetAuthUserByEmailRepository,
  ILoginInCloudGateway,
  AuthUserTransformer,
  LoginUsecase,
} from '@/domains/auth';

export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse = {
  access: AccessDTO;
  authUser: AuthUserDTO;
};

export class LoginController {
  private usecase: LoginUsecase;

  constructor(
    getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    getAuthUserByEmailInCloudRepository: IGetAuthUserByEmailInCloudRepository,
    loginInCloudGateway: ILoginInCloudGateway,
    private readonly validation: Validation
  ) {
    this.usecase = new LoginUsecase(
      getAuthUserByEmailRepository,
      getAuthUserByEmailInCloudRepository,
      loginInCloudGateway
    );
  }

  async execute(request: LoginRequest): Promise<LoginResponse> {
    const hasError = this.validation.validate(request);

    if (hasError) {
      throw new ValidationException(hasError);
    }

    const { email, password } = request;

    const { access, authUser } = await this.usecase.execute({
      email,
      password,
    });

    const accessDTO = {
      accessToken: access.accessToken,
      refreshToken: access.refreshToken,
    };

    const authUserDTO = AuthUserTransformer.generateDTO(authUser);

    return { access: accessDTO, authUser: authUserDTO };
  }
}
