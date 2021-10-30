import { EmailValidator } from '@/presentation/validation/protocols';

import validator from 'validator';

export class ValidatorEmailAdapter implements EmailValidator {
  validate(email: EmailValidator.Params): EmailValidator.Result {
    if (!email) return true;
    const emailIsValid = validator.isEmail(email);
    return emailIsValid;
  }
}
