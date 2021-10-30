import { UuidValidator } from '@/presentation/validation/protocols';

import validator from 'validator';

export class ValidatorUuidAdapter implements UuidValidator {
  validate(uuid: UuidValidator.Params): any {
    if (!uuid) return true;
    const uuidisValid = validator.isUUID(uuid);
    return uuidisValid;
  }
}
