import {
  DefaultException,
  ExceptionTypes,
} from '@/shared/helpers/error-helper';

import { AuthUserDefaultPresenter } from '@/domains/auth/interface/presenters';

export class AuthUserNotMadeFirstLoginException extends DefaultException {
  constructor(authUser: Partial<AuthUserDefaultPresenter>) {
    super({
      type: ExceptionTypes.USER,
      code: 'AUTH_USER_NOT_MADE_FIRST_LOGIN',
      data: authUser,
    });
  }
}
