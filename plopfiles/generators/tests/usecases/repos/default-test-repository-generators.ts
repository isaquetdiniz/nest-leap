const indexForTestRepositoryGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/usecases/repos/index.ts',
  templateFile:
    'plop-templates/__tests__/domains/usecases/repos/index.hbs',
};

const mocksForCountRepositoryGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/usecases/repos/mock-count-{{dashCase name}}s-by-filter-repository.ts',
  templateFile:
    'plop-templates/__tests__/domains/usecases/repos/mock-count-entitys-by-filter-repository.hbs',
};

const mocksForDeleteRepositoryGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/usecases/repos/mock-delete-{{dashCase name}}-by-id-repository.ts',
  templateFile:
    'plop-templates/__tests__/domains/usecases/repos/mock-delete-entity-by-id-repository.hbs',
};

const mocksForGetByIdRepositoryGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/usecases/repos/mock-get-{{dashCase name}}-by-id-repository.ts',
  templateFile:
    'plop-templates/__tests__/domains/usecases/repos/mock-get-entity-by-id-repository.hbs',
};

const mocksForGetByNameRepositoryGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/usecases/repos/mock-get-{{dashCase name}}-by-name-repository.ts',
  templateFile:
    'plop-templates/__tests__/domains/usecases/repos/mock-get-entity-by-name-repository.hbs',
};

const mocksForGetByFilterRepositoryGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/usecases/repos/mock-get-{{dashCase name}}s-by-filter-repository.ts',
  templateFile:
    'plop-templates/__tests__/domains/usecases/repos/mock-get-entitys-by-filter-repository.hbs',
};

const mocksForSaveRepositoryGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/usecases/repos/mock-save-{{dashCase name}}-repository.ts',
  templateFile:
    'plop-templates/__tests__/domains/usecases/repos/mock-save-entity-repository.hbs',
};

const mocksForUpdateRepositoryGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/usecases/repos/mock-update-{{dashCase name}}-repository.ts',
  templateFile:
    'plop-templates/__tests__/domains/usecases/repos/mock-update-entity-repository.hbs',
};

const repositoryMocksForCompleteCrudGenerator = [
  mocksForCountRepositoryGenerator,
  mocksForDeleteRepositoryGenerator,
  mocksForGetByIdRepositoryGenerator,
  mocksForGetByNameRepositoryGenerator,
  mocksForGetByFilterRepositoryGenerator,
  mocksForSaveRepositoryGenerator,
  mocksForUpdateRepositoryGenerator,
  indexForTestRepositoryGenerator,
];

module.exports = {
  repositoryMocksForCompleteCrudGenerator,
  mocksForCountRepositoryGenerator,
  mocksForDeleteRepositoryGenerator,
  mocksForGetByIdRepositoryGenerator,
  mocksForGetByNameRepositoryGenerator,
  mocksForGetByFilterRepositoryGenerator,
  mocksForSaveRepositoryGenerator,
  mocksForUpdateRepositoryGenerator,
  indexForTestRepositoryGenerator,
};
