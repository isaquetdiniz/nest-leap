import { Validation } from '@/presentation/validation/protocols';

import {
  EmailValidation,
  RequiredFieldsValidation,
  ValidationComposite,
  NameValidation,
  BooleanValidation,
} from '@/presentation/validation/validators';

import {
  ValidatorEmailAdapter,
  ValidatorNameAdapter,
  ValidatorBooleanAdapter,
} from '@/infra/validators';

const validations: Validation[] = [];

for (const field of ['name', 'email', 'isAdmin', 'password']) {
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
