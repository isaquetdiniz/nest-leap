import { makeCreateTestValidation } from '@/domains/test'
import { Validation } from '@/shared/interface/validation/protocols';
import {
  RequiredFieldsValidation,
  ValidationComposite,
  BooleanValidation,
} from '@/shared/interface/validation/validators';
import { BooleanValidatorSpy } from '@/tests/shared/validation/mocks';

jest.mock('@/shared/interface/validation/validators/validation-composite');

describe('Create Test Validation Factory', () => {
  it('should call validation composite with all tests validation', () => {
    makeCreateTestValidation();

    const validations: Validation[] = [];

    ['name'].forEach((field) => validations.push(new RequiredFieldsValidation(field)));

    validations.push(new BooleanValidation('enabled', new BooleanValidatorSpy));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
