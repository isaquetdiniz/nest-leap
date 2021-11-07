import { JWTValidator } from '@/presentation/validation/protocols';

import validator from 'validator';

export class ValidatorJWTAdapter implements JWTValidator {
  validate(jwt: JWTValidator.Params): JWTValidator.Result {
    const jwtIsValid = validator.isJWT(jwt);
    return jwtIsValid;
  }
}
