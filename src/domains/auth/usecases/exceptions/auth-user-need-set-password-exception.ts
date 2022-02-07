import {
  DefaultException,
  ExceptionTypes,
} from '@/shared/helpers/error-helper';

import { AuthUserDTO } from '@/domains/auth';

export class AuthUserNeedSetPasswordException extends DefaultException {
  constructor(authUser: Partial<AuthUserDTO>) {
    super({
      type: ExceptionTypes.USER,
      code: 'AUTH_USER_NEED_SET_PASSWORD',
      data: authUser,
    });
  }
}
