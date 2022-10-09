import { ExceptionTypes } from '@/shared/application';

import { DefaultException } from './default_error.exception';

export class ValidationException extends DefaultException {
  constructor(validation: any) {
    super({
      type: ExceptionTypes.USER,
      code: 'VALIDATION',
      data: validation,
    });
  }
}
