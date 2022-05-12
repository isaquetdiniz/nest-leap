import {
  DefaultException,
  ExceptionTypes,
} from '@/shared/helpers/error-helper';

import { AuthUser } from '@/domains/auth';

export class AuthUserNotMadeFirstLoginException extends DefaultException {
  constructor(authUser: Partial<AuthUser>) {
    super({
      type: ExceptionTypes.USER,
      code: 'AUTH_USER_NOT_MADE_FIRST_LOGIN',
      data: authUser,
    });
  }
}
