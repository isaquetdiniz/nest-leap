import {
  DefaultException,
  ExceptionTypes,
} from '@/shared/helpers/error-helper';

export class AuthUserNotFoundByTokenException extends DefaultException {
  constructor(token: string) {
    super({
      type: ExceptionTypes.USER,
      code: 'AUTH_USER_NOT_FOUND_BY_TOKEN',
      data: token,
    });
  }
}
