import {
  DefaultException,
  ExceptionTypes,
} from '@/shared/helpers/error-helper';

import { UserDTO } from '@/domains/user';

export class UserNotFoundException extends DefaultException {
  constructor(user: Partial<UserDTO>) {
    super({
      type: ExceptionTypes.USER,
      code: 'USER_NOT_FOUND',
      data: user,
    });
  }
}
