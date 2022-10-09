import { Validation } from '@/shared/interface/validation/protocols';

import {
  RequiredFieldsValidation,
  ValidationComposite,
} from '@/shared/interface/validation/validators';

const validations: Validation[] = [];

for (const field of ['refreshToken']) {
  validations.push(new RequiredFieldsValidation(field));
}

export const makeGetRefreshTokenValidation = (): ValidationComposite => {
  return new ValidationComposite(validations);
};
