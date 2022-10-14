import { DefaultException, ExceptionTypes } from '@/shared/application';

export class CognitoException extends DefaultException {
  constructor(error: any) {
    super({
      type: ExceptionTypes.SECURITY,
      code: 'COGNITO',
      data: error,
    });
  }
}
