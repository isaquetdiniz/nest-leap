import { DefaultException, ExceptionTypes } from '@/shared/application';

import { AuthUser } from '@/apps/auth/domain';

export class AuthUserNotFoundException extends DefaultException {
  constructor(authUser: Partial<AuthUser>) {
    super({
      type: ExceptionTypes.USER,
      code: 'AUTH_USER_NOT_FOUND',
      data: authUser,
    });
  }
}
