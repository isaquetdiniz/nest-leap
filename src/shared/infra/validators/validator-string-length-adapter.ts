import { StringLengthValidator } from '@/shared/interface/validation/protocols';

export class ValidatorStringLengthAdapter implements StringLengthValidator {
  maxLength: number;

  constructor(maxLength: number = 150) {
    this.maxLength = maxLength;
  }

  validate(params: StringLengthValidator.Params): StringLengthValidator.Result {
    if (params.length > this.maxLength) return false;
    return true;
  }
}
