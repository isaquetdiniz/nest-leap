import {
  DefaultException,
  ExceptionTypes,
} from '@/shared/helpers/error-helper';

import { AuthUserDTO } from '@/domains/auth';

export class AuthUserNotMadeFirstLoginException extends DefaultException {
  constructor(authUser: Partial<AuthUserDTO>) {
    super({
      type: ExceptionTypes.USER,
      code: 'AUTH_USER_NOT_MADE_FIRST_LOGIN',
      data: authUser,
    });
  }
}
