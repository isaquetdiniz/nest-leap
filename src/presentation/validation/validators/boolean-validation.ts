import { InvalidParamError } from '@/presentation/validation/errors';

import {
  BooleanValidator,
  Validation,
} from '@/presentation/validation/protocols';

export class BooleanValidation implements Validation {
  private readonly fieldName: string;
  private readonly booleanValidator: BooleanValidator;

  constructor(fieldName: string, booleanValidator: BooleanValidator) {
    this.fieldName = fieldName;
    this.booleanValidator = booleanValidator;
  }

  validate(input: Validation.Params): Validation.Result {
    const isValid = this.booleanValidator.validate(input[this.fieldName]);

    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
