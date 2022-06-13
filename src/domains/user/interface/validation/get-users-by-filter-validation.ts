import { Validation } from '@/shared/interface/validation/protocols';

import {
  EmailValidation,
  ValidationComposite,
  NameValidation,
  BooleanValidation,
  NumberValidation,
  UuidValidation,
  RangeDateValidation,
  OrderByValidation,
} from '@/shared/interface/validation/validators';

import {
  ValidatorEmailAdapter,
  ValidatorNameAdapter,
  ValidatorBooleanAdapter,
  ValidatorNumberAdapter,
  ValidatorUuidAdapter,
  ValidatorDateAdapter,
} from '@/shared/infra/validators';

const validations: Validation[] = [];

validations.push(new UuidValidation('id', new ValidatorUuidAdapter()));
validations.push(new EmailValidation('email', new ValidatorEmailAdapter()));
validations.push(new NameValidation('name', new ValidatorNameAdapter()));
validations.push(new BooleanValidation('isAdmin', new ValidatorBooleanAdapter()));
validations.push(new BooleanValidation('enabled', new ValidatorBooleanAdapter()));
validations.push(new NumberValidation('take', new ValidatorNumberAdapter()));
validations.push(new NumberValidation('skip', new ValidatorNumberAdapter()));
validations.push(new RangeDateValidation('createdAt', new ValidatorDateAdapter()));
validations.push(new RangeDateValidation('updatedAt', new ValidatorDateAdapter()));
validations.push(new OrderByValidation('orderBy'));

export const makeGetUsersByFilterValidation = (): ValidationComposite => {
  return new ValidationComposite(validations);
};
