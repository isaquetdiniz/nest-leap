import { NumberValidator } from '@/presentation/validation/protocols';

export class ValidatorNumberAdapter implements NumberValidator {
  validate(number: NumberValidator.Params): any {
    if (!number) return true;
    const isNumber = typeof number === 'number';

    return isNumber;
  }
}
