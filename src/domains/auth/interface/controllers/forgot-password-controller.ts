import { Validation } from '@/shared/interface/validation/protocols';
import { ValidationException } from '@/shared/helpers';

import {
  IForgotPasswordInCloudGateway,
  ForgotPasswordUsecase,
  IGetAuthUserByEmailRepository,
  IGetAuthUserByEmailInCloudGateway,
} from '@/domains/auth';

export interface ForgotPasswordRequest {
  email: string;
}

export type ForgotPasswordResponse = void;

export class ForgotPasswordController {
  private usecase: ForgotPasswordUsecase;

  constructor(
    getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    getAuthUserByEmailInCloudGateway: IGetAuthUserByEmailInCloudGateway,
    forgotPasswordInCloudGateway: IForgotPasswordInCloudGateway,
    private readonly validation: Validation
  ) {
    this.usecase = new ForgotPasswordUsecase(
      getAuthUserByEmailRepository,
      getAuthUserByEmailInCloudGateway,
      forgotPasswordInCloudGateway
    );
  }

  async execute(
    request: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse> {
    const hasError = this.validation.validate(request);

    if (hasError) {
      throw new ValidationException(hasError);
    }

    const { email } = request;

    await this.usecase.execute({
      email,
    });
  }
}
