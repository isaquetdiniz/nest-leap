import { InvalidParamError } from '@/shared/interface/validation/errors';

import {
  PhoneValidator,
  Validation,
} from '@/shared/interface/validation/protocols';

export class PhoneValidation implements Validation {
  private readonly fieldName: string;
  private readonly phoneValidator: PhoneValidator;

  constructor(fieldName: string, phoneValidator: PhoneValidator) {
    this.fieldName = fieldName;
    this.phoneValidator = phoneValidator;
  }

  validate(input: Validation.Params): Validation.Result {
    if (input[this.fieldName] === undefined) return;
    const isValid = this.phoneValidator.validate(input[this.fieldName]);

    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
