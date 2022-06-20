import { makeUpdateTestValidation } from '@/domains/test';
import { Validation } from '@/shared/interface/validation/protocols';
import {
  ValidationComposite,
  UuidValidation,
  BooleanValidation,
  RequiredFieldsValidation,
} from '@/shared/interface/validation/validators';
import { UuidValidatorSpy, BooleanValidatorSpy } from '@/tests/shared/validation/mocks';

jest.mock('@/shared/interface/validation/validators/validation-composite');

describe('Get Test by Filter Validation Factory', () => {
  it('should call validation composite with all validations', () => {
    makeUpdateTestValidation();

    const validations: Validation[] = [];

    validations.push(new RequiredFieldsValidation('id'));

    validations.push(new UuidValidation('id', new UuidValidatorSpy()));
    validations.push(new BooleanValidation('enabled', new BooleanValidatorSpy));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
