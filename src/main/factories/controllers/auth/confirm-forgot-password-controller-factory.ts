import { Controller } from '@/application/http-server/protocols';
import { makeLogControllerDecorator } from '@/main/factories/controllers';
import { makeConfirmForgotPasswordCloudService } from '@/main/factories/services/auth';
import { makeConfirmForgotPasswordValidation } from '@/main/factories/validation/auth';
import { ConfirmForgotPasswordController } from '@/application/http-server/controllers/auth';

export const makeConfirmForgotPasswordController = (): Controller => {
  const confirmForgotPasswordUsecase = makeConfirmForgotPasswordCloudService();

  const validation = makeConfirmForgotPasswordValidation();

  const confirmForgotPasswordController = new ConfirmForgotPasswordController(
    validation,
    confirmForgotPasswordUsecase
  );

  const confirmForgotPasswordControllerWithLogDecorator =
    makeLogControllerDecorator(confirmForgotPasswordController);

  return confirmForgotPasswordControllerWithLogDecorator;
};
