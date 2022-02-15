import { Validation } from '@/shared/interface/validation/protocols';

import {
  JWTValidation,
  RequiredFieldsValidation,
  ValidationComposite,
} from '@/shared/interface/validation/validators';

import { ValidatorJWTAdapter } from '@/shared/infra/validators';

const validations: Validation[] = [];

for (const field of ['token']) {
  validations.push(new RequiredFieldsValidation(field));
}

validations.push(new JWTValidation('token', new ValidatorJWTAdapter()));

export const makeGetAuthUserByTokenValidation = (): ValidationComposite => {
  return new ValidationComposite(validations);
};
