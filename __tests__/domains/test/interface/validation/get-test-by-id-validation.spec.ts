import { makeGetTestByIdValidation } from '@/domains/test'
import { Validation } from '@/shared/interface/validation/protocols';
import {
  RequiredFieldsValidation,
  ValidationComposite,
  UuidValidation,
} from '@/shared/interface/validation/validators';
import { UuidValidatorSpy } from '@/tests/shared/validation/mocks';

jest.mock('@/shared/interface/validation/validators/validation-composite');

describe('Get Test by ID Validation Factory', () => {
  it('should call validation composite with all validations', () => {
    makeGetTestByIdValidation();

    const validations: Validation[] = [];

    validations.push(new RequiredFieldsValidation('id'));

    validations.push(new UuidValidation('id', new UuidValidatorSpy()));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
