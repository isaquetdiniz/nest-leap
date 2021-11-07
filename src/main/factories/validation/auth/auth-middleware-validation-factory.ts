import { Validation } from '@/presentation/validation/protocols';

import {
  RequiredFieldsValidation,
  ValidationComposite,
  BearerTokenValidation,
} from '@/presentation/validation/validators';

import { ValidatorTokenAdapter } from '@/infra/validators';

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
