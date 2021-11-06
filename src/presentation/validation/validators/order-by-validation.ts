import { InvalidParamError } from '@/presentation/validation/errors';

import { Validation } from '@/presentation/validation/protocols';

export class OrderByValidation implements Validation {
  private readonly fieldName: string;

  constructor(fieldName: string) {
    this.fieldName = fieldName;
  }

  validate(input: Validation.Params): Validation.Result {
    if (input[this.fieldName] === undefined) return;

    const { property, mode } = input[this.fieldName];

    console.log({ property, mode });

    if (property === undefined || mode === undefined) {
      return new InvalidParamError(this.fieldName);
    }

    if (mode !== 'asc' && mode !== 'desc') {
      return new InvalidParamError(this.fieldName);
    }
  }
}
