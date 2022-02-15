import {
  DefaultException,
  ExceptionTypes,
} from '@/shared/helpers/error-helper';

import { UserDTO } from '@/domains/user';

export class UserAlreadyExistsException extends DefaultException {
  constructor(user: Partial<UserDTO>) {
    super({
      type: ExceptionTypes.USER,
      code: 'USER_ALREADY_EXISTS',
      data: user,
    });
  }
}