import { Validation } from '@/presentation/validation/protocols';

import {
  RequiredFieldsValidation,
  ValidationComposite,
} from '@/presentation/validation/validators';

const validations: Validation[] = [];

for (const field of ['refreshToken']) {
  validations.push(new RequiredFieldsValidation(field));
}

export const makeRefreshTokenValidation = (): ValidationComposite => {
  return new ValidationComposite(validations);
};
