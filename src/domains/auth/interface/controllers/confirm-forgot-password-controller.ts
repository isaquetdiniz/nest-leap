import { Validation } from '@/shared/interface/validation/protocols';
import { ValidationException } from '@/shared/helpers';

import {
  IGetAuthUserByEmailRepository,
  IGetAuthUserByEmailInCloudRepository,
  ConfirmForgotPasswordUsecase,
  IConfirmForgotPasswordInCloudGateway,
} from '@/domains/auth';

export interface ConfirmForgotPasswordRequest {
  email: string;
  verificationCode: string;
  newPassword: string;
}

export type ConfirmForgotPasswordResponse = void;

export class ConfirmForgotPasswordController {
  private usecase: ConfirmForgotPasswordUsecase;

  constructor(
    getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    getAuthUserByEmailInCloudRepository: IGetAuthUserByEmailInCloudRepository,
    confirmForgotPasswordInCloudGateway: IConfirmForgotPasswordInCloudGateway,
    private readonly validation: Validation
  ) {
    this.usecase = new ConfirmForgotPasswordUsecase(
      getAuthUserByEmailRepository,
      getAuthUserByEmailInCloudRepository,
      confirmForgotPasswordInCloudGateway
    );
  }

  async execute(
    request: ConfirmForgotPasswordRequest
  ): Promise<ConfirmForgotPasswordResponse> {
    const hasError = this.validation.validate(request);

    if (hasError) {
      throw new ValidationException(hasError);
    }

    const { email, verificationCode, newPassword } = request;

    await this.usecase.execute({
      email,
      verificationCode,
      newPassword,
    });
  }
}
