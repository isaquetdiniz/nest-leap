import {
  DefaultException,
  ExceptionTypes,
} from '@/shared/helpers/error-helper';

import { AuthUserDefaultPresenter } from '@/domains/auth/interface/presenters';

export class AuthUserNeedSetPasswordException extends DefaultException {
  constructor(authUser: Partial<AuthUserDefaultPresenter>) {
    super({
      type: ExceptionTypes.USER,
      code: 'AUTH_USER_NEED_SET_PASSWORD',
      data: authUser,
    });
  }
}
