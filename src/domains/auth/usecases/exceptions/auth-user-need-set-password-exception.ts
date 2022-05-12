import {
  DefaultException,
  ExceptionTypes,
} from '@/shared/helpers/error-helper';

import { AuthUser } from '@/domains/auth';

export class AuthUserNeedSetPasswordException extends DefaultException {
  constructor(authUser: Partial<AuthUser>) {
    super({
      type: ExceptionTypes.USER,
      code: 'AUTH_USER_NEED_SET_PASSWORD',
      data: authUser,
    });
  }
}
