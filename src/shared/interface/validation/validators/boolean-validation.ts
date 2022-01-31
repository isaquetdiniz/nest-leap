import { InvalidParamError } from '@/shared/interface/validation/errors';

import {
  BooleanValidator,
  Validation,
} from '@/shared/interface/validation/protocols';

export class BooleanValidation implements Validation {
  private readonly fieldName: string;
  private readonly booleanValidator: BooleanValidator;

  constructor(fieldName: string, booleanValidator: BooleanValidator) {
    this.fieldName = fieldName;
    this.booleanValidator = booleanValidator;
  }

  validate(input: Validation.Params): Validation.Result {
    if (input[this.fieldName] === undefined) return;
    const isValid = this.booleanValidator.validate(input[this.fieldName]);

    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
