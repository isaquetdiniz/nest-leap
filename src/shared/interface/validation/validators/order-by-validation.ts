import { InvalidParamError } from '@/shared/interface/validation/errors';

import { Validation } from '@/shared/interface/validation/protocols';

export class OrderByValidation implements Validation {
  private readonly fieldName: string;

  constructor(fieldName: string) {
    this.fieldName = fieldName;
  }

  validate(input: Validation.Params): Validation.Result {
    if (input[this.fieldName] === undefined) return;

    const { property, mode } = input[this.fieldName];

    if (property === undefined || mode === undefined) return;

    if (mode !== 'asc' && mode !== 'desc') {
      return new InvalidParamError(this.fieldName);
    }
  }
}
