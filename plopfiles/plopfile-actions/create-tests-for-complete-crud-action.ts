const {
  factoryForEntityGenerator: crudTestsEntityGenerator,
} = require('../generators/tests/factory/factory-generators.ts');
const {
  infraTestsForCompleteCrudsGenerator: crudTestsInfraGenerator,
} = require('../generators/tests/infra/infrastructure-tests-generator.ts');
const {
  usecaseTestsForCompleteCrudGenerator: crudTestsUsecaseGenerator,
} = require('../generators/tests/application/application-tests-generator.ts');
const {
  pathAliasForCompleteCrudTestsGenerator: crudPathAliasTestsGenerator,
} = require('../generators/tests/path-alias-generator.ts');

const createTestsForCompleteCrudAction = [
  ...crudTestsEntityGenerator,
  ...crudTestsInfraGenerator,
  ...crudTestsUsecaseGenerator,
  ...crudPathAliasTestsGenerator,
];

module.exports = {
  createTestsForCompleteCrudAction,
};
