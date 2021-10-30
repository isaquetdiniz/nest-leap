import { InvalidParamError } from '@/presentation/validation/errors';

import {
  ProfileImageValidator,
  Validation,
} from '@/presentation/validation/protocols';

export class ProfileImageValidation implements Validation {
  private readonly fieldName: string;
  private readonly profileImageValidator: ProfileImageValidator;

  constructor(fieldName: string, profileImageValidator: ProfileImageValidator) {
    this.fieldName = fieldName;
    this.profileImageValidator = profileImageValidator;
  }

  validate(input: Validation.Params): Validation.Result {
    const isValid = this.profileImageValidator.validate(input[this.fieldName]);

    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
