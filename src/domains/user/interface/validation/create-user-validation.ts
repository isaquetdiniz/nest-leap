import { Validation } from '@/shared/interface/validation/protocols';

import {
  EmailValidation,
  RequiredFieldsValidation,
  ValidationComposite,
  NameValidation,
  BooleanValidation,
} from '@/shared/interface/validation/validators';

import {
  ValidatorEmailAdapter,
  ValidatorNameAdapter,
  ValidatorBooleanAdapter,
} from '@/shared/infra/validators';

const validations: Validation[] = [];

for (const field of ['name', 'email', 'isAdmin']) {
  validations.push(new RequiredFieldsValidation(field));
}

validations.push(new EmailValidation('email', new ValidatorEmailAdapter()));
validations.push(new NameValidation('name', new ValidatorNameAdapter()));
validations.push(
  new BooleanValidation('isAdmin', new ValidatorBooleanAdapter())
);

export const makeCreateUserValidation = (): ValidationComposite => {
  return new ValidationComposite(validations);
};
