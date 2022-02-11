import {
  DefaultException,
  ExceptionTypes,
} from '@/shared/helpers/error-helper';

export class CognitoException extends DefaultException {
  constructor(error: any) {
    super({
      type: ExceptionTypes.SECURITY,
      code: 'COGNITO',
      data: error,
    });
  }
}
