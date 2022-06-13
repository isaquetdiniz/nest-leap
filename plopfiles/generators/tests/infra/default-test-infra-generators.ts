const testsForCountRepositoryGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/infra/prisma/repositories/count-{{dashCase name}}s-by-filter-repository.spec.ts',
  templateFile: 'plop-templates/__tests__/domains/infra/prisma/repositories/count-entitys-by-filter-repository.spec.hbs',
};

const testsForDeleteRepositoryGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/infra/prisma/repositories/delete-{{dashCase name}}-by-id-repository.spec.ts',
  templateFile: 'plop-templates/__tests__/domains/infra/prisma/repositories/delete-entity-by-id-repository.spec.hbs',
};

const testsForGetByIdRepositoryGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/infra/prisma/repositories/get-{{dashCase name}}-by-id-repository.spec.ts',
  templateFile: 'plop-templates/__tests__/domains/infra/prisma/repositories/get-entity-by-id-repository.spec.hbs',
};

const testsForGetByNameRepositoryGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/infra/prisma/repositories/get-{{dashCase name}}-by-name-repository.spec.ts',
  templateFile: 'plop-templates/__tests__/domains/infra/prisma/repositories/get-entity-by-name-repository.spec.hbs',
};

const testsForGetByFilterRepositoryGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/infra/prisma/repositories/get-{{dashCase name}}s-by-filter-repository.spec.ts',
  templateFile: 'plop-templates/__tests__/domains/infra/prisma/repositories/get-entitys-by-filter-repository.spec.hbs',
};

const testsForSaveRepositoryGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/infra/prisma/repositories/save-{{dashCase name}}-repository.spec.ts',
  templateFile: 'plop-templates/__tests__/domains/infra/prisma/repositories/save-entity-repository.spec.hbs',
};

const testsForUpdateRepositoryGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/infra/prisma/repositories/update-{{dashCase name}}-repository.spec.ts',
  templateFile: 'plop-templates/__tests__/domains/infra/prisma/repositories/update-entity-repository.spec.hbs',
};

const infraTestsForCompleteCrudsGenerator = [
  testsForCountRepositoryGenerator,
  testsForDeleteRepositoryGenerator,
  testsForGetByIdRepositoryGenerator,
  testsForGetByNameRepositoryGenerator,
  testsForGetByFilterRepositoryGenerator,
  testsForSaveRepositoryGenerator,
  testsForUpdateRepositoryGenerator,
];

module.exports = {
  infraTestsForCompleteCrudsGenerator,
  testsForCountRepositoryGenerator,
  testsForDeleteRepositoryGenerator,
  testsForGetByIdRepositoryGenerator,
  testsForGetByNameRepositoryGenerator,
  testsForGetByFilterRepositoryGenerator,
  testsForSaveRepositoryGenerator,
  testsForUpdateRepositoryGenerator,
};
