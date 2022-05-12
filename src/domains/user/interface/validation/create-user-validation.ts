import { Validation } from '@/shared/interface/validation/protocols';

import {
  EmailValidation,
  RequiredFieldsValidation,
  ValidationComposite,
  NameValidation,
  BooleanValidation,
  StringLengthValidation,
} from '@/shared/interface/validation/validators';

import {
  ValidatorEmailAdapter,
  ValidatorNameAdapter,
  ValidatorBooleanAdapter,
  ValidatorStringLengthAdapter,
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
validations.push(
  new StringLengthValidation('name', new ValidatorStringLengthAdapter(50))
);

export const makeCreateUserValidation = (): ValidationComposite => {
  return new ValidationComposite(validations);
};
