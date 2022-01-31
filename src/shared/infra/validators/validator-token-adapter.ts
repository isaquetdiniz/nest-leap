import validator from 'validator';

import { TokenValidator } from '@/shared/interface/validation/protocols';

export class ValidatorTokenAdapter implements TokenValidator {
  validate(token: TokenValidator.Params): TokenValidator.Result {
    const tokenIsValid = validator.isJWT(token);
    return tokenIsValid;
  }
}
