const {
  exceptionsForCompleteCrudGenerator: crudExceptionGenerator,
} = require('../generators/src/app/application/exceptions/default-exception-generators.ts');

const {
  repoForCompleteCrudGenerator: crudRepositoryGenerator,
} = require('../generators/src/app/application/repos/default-repo-generators.ts');

const {
  usecasesForCompleteCrudGenerator: crudUsecaseGenerator,
} = require('../generators/src/app/application/usecases/default-usecases-generators.ts');

const {
  domainEntityGenerator: crudDomainGenerator,
} = require('../generators/src/app/domain/default-domain-generators.ts');

const {
  infraModuleGenerator: crudModuleGenerator,
} = require('../generators/src/app/infra/nest/modules/default-modules-generators.ts');

const {
  servicesForCompleteCrudGenerator: crudServicesGenerator,
} = require('../generators/src/app/infra/nest/services/default-services-generators.ts');

const {
  infraPrismaGenerator: crudPrismaGenerator,
} = require('../generators/src/app/infra/prisma/default-prisma-generators.ts');

const {
  controllersForCompleteCrudGenerator: crudControllerGenerator,
} = require('../generators/src/app/interface/controllers/default-controllers-generators.ts');

const {
  apiControllersForCompleteCrudGenerator: crudApiControllersGenerator,
} = require('../generators/src/api-users/infra/nest/controllers/default-controllers-generators.ts');

const {
  apiInfraModuleGenerator: crudApiModuleGenerator,
} = require('../generators/src/api-users/infra/nest/modules/default-modules-generators.ts');

const {
  pathAliasForCompleteCrudGenerator: crudPathAliassGenerator,
} = require('../generators/src/path-alias-generator.ts');

const createCompleteCrudAction = [
  ...crudExceptionGenerator,
  ...crudRepositoryGenerator,
  ...crudUsecaseGenerator,
  ...crudDomainGenerator,
  ...crudModuleGenerator,
  ...crudServicesGenerator,
  ...crudPrismaGenerator,
  ...crudControllerGenerator,
  ...crudApiControllersGenerator,
  ...crudApiModuleGenerator,
  ...crudPathAliassGenerator,
];

module.exports = {
  createCompleteCrudAction,
};
