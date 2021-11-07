import { Controller } from '@/presentation/http/protocols';
import { makeLogControllerDecorator } from '@/main/factories/controllers';
import { makeForgotPasswordCloudService } from '@/main/factories/services/auth';
import { makeForgotPasswordValidation } from '@/main/factories/validation/auth';
import { ForgotPasswordController } from '@/presentation/http/controllers/auth';

export const makeForgotPasswordController = (): Controller => {
  const forgotPasswordUsecase = makeForgotPasswordCloudService();

  const validation = makeForgotPasswordValidation();

  const forgotPasswordController = new ForgotPasswordController(
    validation,
    forgotPasswordUsecase
  );

  const forgotPasswordControllerWithLogDecorator = makeLogControllerDecorator(
    forgotPasswordController
  );

  return forgotPasswordControllerWithLogDecorator;
};
