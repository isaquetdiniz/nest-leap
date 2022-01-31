import { BooleanValidator } from '@/shared/interface/validation/protocols';

export class ValidatorBooleanAdapter implements BooleanValidator {
  validate(boolean: BooleanValidator.Params): BooleanValidator.Result {
    if (typeof boolean !== 'boolean') return false;
    return true;
  }
}
