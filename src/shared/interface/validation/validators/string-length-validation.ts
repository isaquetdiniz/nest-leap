import { InvalidParamError } from '@/shared/interface/validation/errors';

import {
  StringLengthValidator,
  Validation,
} from '@/shared/interface/validation/protocols';

export class StringLengthValidation implements Validation {
  private readonly fieldName: string;
  private readonly stringLengthValidator: StringLengthValidator;

  constructor(fieldName: string, stringLengthValidator: StringLengthValidator) {
    this.fieldName = fieldName;
    this.stringLengthValidator = stringLengthValidator;
  }

  validate(input: Validation.Params): Validation.Result {
    if (input[this.fieldName] === undefined) return;
    const isValid = this.stringLengthValidator.validate(input[this.fieldName]);

    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
