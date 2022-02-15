import { Validation } from '@/shared/interface/validation/protocols';
import { ValidationException } from '@/shared/helpers';

import {
  IGetAuthUserByEmailRepository,
  IGetAuthUserByEmailInCloudGateway,
  ConfirmForgotPasswordUsecase,
  IConfirmForgotPasswordInCloudGateway,
} from '@/domains/auth';
import { ILoggerLocal } from '@/shared/protocols';

export interface ConfirmForgotPasswordRequest {
  email: string;
  verificationCode: string;
  newPassword: string;
}

export type ConfirmForgotPasswordResponse = void;

export class ConfirmForgotPasswordController {
  private usecase: ConfirmForgotPasswordUsecase;
  private logger: ILoggerLocal;

  constructor(
    getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    getAuthUserByEmailInCloudGateway: IGetAuthUserByEmailInCloudGateway,
    confirmForgotPasswordInCloudGateway: IConfirmForgotPasswordInCloudGateway,
    private readonly validation: Validation,
    logger: ILoggerLocal
  ) {
    this.usecase = new ConfirmForgotPasswordUsecase(
      getAuthUserByEmailRepository,
      getAuthUserByEmailInCloudGateway,
      confirmForgotPasswordInCloudGateway,
      logger
    );

    this.logger = logger.child({ controller: 'confirm-forgot-password' });
  }

  async execute(
    request: ConfirmForgotPasswordRequest
  ): Promise<ConfirmForgotPasswordResponse> {
    this.logger.logDebug({ message: 'Request Received', data: request });
    const hasError = this.validation.validate(request);

    if (hasError) {
      throw new ValidationException(hasError);
    }

    this.logger.logDebug({ message: 'Params Validated' });

    const { email, verificationCode, newPassword } = request;

    await this.usecase.execute({
      email,
      verificationCode,
      newPassword,
    });

    this.logger.logDebug({
      message: 'Auth User confirm forgot password',
      data: request,
    });
  }
}
