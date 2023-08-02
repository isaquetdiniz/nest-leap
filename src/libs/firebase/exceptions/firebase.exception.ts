import { DefaultException, ExceptionTypes } from '@/core/application';

export class FirebaseException extends DefaultException {
  constructor(error: any) {
    super({
      type: ExceptionTypes.SECURITY,
      code: 'FIREBASE_EXCEPTION',
      data: error,
    });
  }
}
