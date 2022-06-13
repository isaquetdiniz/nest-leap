const testsForCreateValidationGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/interface/validation/create-{{dashCase name}}-validation.spec.ts',
  templateFile:
    'plop-templates/__tests__/domains/interface/validation/create-entity-validation.spec.hbs',
};

const testsForDeleteValidationGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/interface/validation/delete-{{dashCase name}}-by-id-validation.spec.ts',
  templateFile:
    'plop-templates/__tests__/domains/interface/validation/delete-entity-by-id-validation.spec.hbs',
};

const testsForGetByIdValidationGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/interface/validation/get-{{dashCase name}}-by-id-validation.spec.ts',
  templateFile:
    'plop-templates/__tests__/domains/interface/validation/get-entity-by-id-validation.spec.hbs',
};

const testsForGetByFiltersValidationGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/interface/validation/get-{{dashCase name}}s-by-filter-validation.spec.ts',
  templateFile:
    'plop-templates/__tests__/domains/interface/validation/get-entitys-by-filter-validation.spec.hbs',
};

const testsForGetValidationGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/interface/validation/update-{{dashCase name}}-validation.spec.ts',
  templateFile:
    'plop-templates/__tests__/domains/interface/validation/update-entity-validation.spec.hbs',
};

const validationTestsForCompleteCrudGenerator = [
  testsForCreateValidationGenerator,
  testsForDeleteValidationGenerator,
  testsForGetByIdValidationGenerator,
  testsForGetByFiltersValidationGenerator,
  testsForGetValidationGenerator,
];

module.exports = {
  testsForCreateValidationGenerator,
  testsForDeleteValidationGenerator,
  testsForGetByFiltersValidationGenerator,
  testsForGetByIdValidationGenerator,
  testsForGetValidationGenerator,
  validationTestsForCompleteCrudGenerator,
};
