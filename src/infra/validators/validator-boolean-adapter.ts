import { BooleanValidator } from '@/presentation/validation/protocols';

export class ValidatorBooleanAdapter implements BooleanValidator {
  validate(boolean: BooleanValidator.Params): BooleanValidator.Result {
    if (typeof boolean === 'undefined') return true;
    if (typeof boolean !== 'boolean') return false;
    return true;
  }
}
