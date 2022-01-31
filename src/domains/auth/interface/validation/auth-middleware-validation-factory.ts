import { Validation } from '@/shared/interface/validation/protocols';

import {
  RequiredFieldsValidation,
  ValidationComposite,
  BearerTokenValidation,
} from '@/shared/interface/validation/validators';

import { ValidatorTokenAdapter } from '@/shared/infra/validators';

const validations: Validation[] = [];

for (const field of ['accessToken']) {
  validations.push(new RequiredFieldsValidation(field));
}

validations.push(
  new BearerTokenValidation('accessToken', new ValidatorTokenAdapter())
);

export const makeAuthMiddlewareValidation = (): ValidationComposite => {
  return new ValidationComposite(validations);
};
