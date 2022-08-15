import { DefaultException, ExceptionTypes } from '@/shared/helpers';

export class AwsS3Exception extends DefaultException {
  constructor(error: any, errorType: 'Upload Error' | 'Delete Error') {
    super({
      type: ExceptionTypes.SYSTEM,
      code: 'AWS S3',
      data: error,
      message: errorType,
    });
  }
}
