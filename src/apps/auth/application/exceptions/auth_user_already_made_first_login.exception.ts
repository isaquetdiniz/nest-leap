import { DefaultException, ExceptionTypes } from '@/shared/application';

import { AuthUser } from '@/apps/auth/domain';

export class AuthUserAlreadyMadeFirstLoginException extends DefaultException {
  constructor(authUser: Partial<AuthUser>) {
    super({
      type: ExceptionTypes.USER,
      code: 'AUTH_USER_ALREADY_MADE_FIRST_LOGIN',
      data: authUser,
    });
  }
}
