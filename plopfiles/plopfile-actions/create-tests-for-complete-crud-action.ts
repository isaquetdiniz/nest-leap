const { mocksForDefaultEntityGenerator: crudTestsEntityGenerator } = require('../generators/tests/domain/default-test-domain-generators.ts');
const { infraTestsForCompleteCrudsGenerator: crudTestsInfraGenerator } = require('../generators/tests/infra/default-test-infra-generators.ts');
const { validationTestsForCompleteCrudGenerator: crudTestsValidationGenerator } = require('../generators/tests/interface/validation/default-test-validation-generators.ts');
const { usecaseMocksForCompleteCrudGenerator: crudMocksUsecaseGenerator } = require('../generators/tests/usecases/mocks/default-usecases-mocks-generators.ts');
const { repositoryMocksForCompleteCrudGenerator: crudMocksRepositoryGenerator } = require('../generators/tests/usecases/repos/default-test-repository-generators.ts');
const { usecaseTestsForCompleteCrudGenerator: crudTestsUsecaseGenerator } = require('../generators/tests/usecases/defaut-usecase-test-generators.ts');

const createTestsForCompleteCrudAction = [
  crudTestsEntityGenerator,
  ...crudTestsInfraGenerator,
  ...crudTestsValidationGenerator,
  ...crudMocksUsecaseGenerator,
  ...crudMocksRepositoryGenerator,
  ...crudTestsUsecaseGenerator,
];

module.exports = {
  createTestsForCompleteCrudAction
};

