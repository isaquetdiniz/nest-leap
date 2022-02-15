import { Validation } from '@/shared/interface/validation/protocols';
import { ValidationException } from '@/shared/helpers';

import {
  IForgotPasswordInCloudGateway,
  ForgotPasswordUsecase,
  IGetAuthUserByEmailRepository,
  IGetAuthUserByEmailInCloudGateway,
} from '@/domains/auth';
import { ILoggerLocal } from '@/shared/protocols';

export interface ForgotPasswordRequest {
  email: string;
}

export type ForgotPasswordResponse = void;

export class ForgotPasswordController {
  private usecase: ForgotPasswordUsecase;
  private logger: ILoggerLocal;

  constructor(
    getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    getAuthUserByEmailInCloudGateway: IGetAuthUserByEmailInCloudGateway,
    forgotPasswordInCloudGateway: IForgotPasswordInCloudGateway,
    private readonly validation: Validation,
    logger: ILoggerLocal
  ) {
    this.usecase = new ForgotPasswordUsecase(
      getAuthUserByEmailRepository,
      getAuthUserByEmailInCloudGateway,
      forgotPasswordInCloudGateway,
      logger
    );

    this.logger = logger.child({ controller: 'forgot-password' });
  }

  async execute(
    request: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse> {
    this.logger.logDebug({ message: 'Request Received', data: request });
    const hasError = this.validation.validate(request);

    if (hasError) {
      throw new ValidationException(hasError);
    }

    this.logger.logDebug({ message: 'Params validated' });

    const { email } = request;

    await this.usecase.execute({
      email,
    });
  }
}
