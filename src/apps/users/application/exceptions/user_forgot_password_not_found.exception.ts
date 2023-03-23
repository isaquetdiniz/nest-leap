import { DefaultException, ExceptionTypes } from '@/core/application';
import { UserForgotPassword } from '@/users/domain';

export class UserForgotPasswordNotFoundException extends DefaultException {
  constructor(userForgotPassword: Partial<UserForgotPassword>) {
    super({
      type: ExceptionTypes.USER,
      code: 'USER_FORGOT_PASSWORD_NOT_FOUND',
      data: userForgotPassword,
    });
  }
}
