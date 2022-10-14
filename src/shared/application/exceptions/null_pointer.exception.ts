import { ExceptionTypes } from '@/shared/application';
import { DefaultException } from './default_error.exception';

export class NullPointerException extends DefaultException {
  constructor(detail?: string) {
    super({
      message: 'Null pointer',
      type: ExceptionTypes.SYSTEM,
      code: 'NULL_POINTER',
      data: detail,
    });
  }
}
