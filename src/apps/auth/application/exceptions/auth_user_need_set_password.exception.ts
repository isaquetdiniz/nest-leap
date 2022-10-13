import { DefaultException, ExceptionTypes } from '@/shared/application';

import { AuthUser } from '@/apps/auth/domain';

export class AuthUserNeedSetPasswordException extends DefaultException {
  constructor(authUser: Partial<AuthUser>) {
    super({
      type: ExceptionTypes.USER,
      code: 'AUTH_USER_NEED_SET_PASSWORD',
      data: authUser,
    });
  }
}
