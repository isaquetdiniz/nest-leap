const indexForMocksUsecaseGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/usecases/mocks/index.ts',
  templateFile:
    'plop-templates/__tests__/domains/usecases/mocks/index.hbs',
};

const mocksForCreateUsecaseGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/usecases/mocks/mock-create-{{dashCase name}}-usecase.ts',
  templateFile:
    'plop-templates/__tests__/domains/usecases/mocks/mock-create-entity-usecase.hbs',
};

const mocksForDeleteUsecaseGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/usecases/mocks/mock-delete-{{dashCase name}}-by-id-usecase.ts',
  templateFile:
    'plop-templates/__tests__/domains/usecases/mocks/mock-delete-entity-by-id-usecase.hbs',
};

const mocksForGetByIdUsecaseGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/usecases/mocks/mock-get-{{dashCase name}}-by-id-usecase.ts',
  templateFile:
    'plop-templates/__tests__/domains/usecases/mocks/mock-get-entity-by-id-usecase.hbs',
};

const mocksForGetByFilterUsecaseGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/usecases/mocks/mock-get-{{dashCase name}}s-by-filter-usecase.ts',
  templateFile:
    'plop-templates/__tests__/domains/usecases/mocks/mock-get-entitys-by-filter-usecase.hbs',
};

const mocksForUpdateUsecaseGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/usecases/mocks/mock-update-{{dashCase name}}-usecase.ts',
  templateFile:
    'plop-templates/__tests__/domains/usecases/mocks/mock-update-entity-usecase.hbs',
};

const usecaseMocksForCompleteCrudGenerator = [
  indexForMocksUsecaseGenerator,
  mocksForCreateUsecaseGenerator,
  mocksForDeleteUsecaseGenerator,
  mocksForGetByIdUsecaseGenerator,
  mocksForGetByFilterUsecaseGenerator,
  mocksForUpdateUsecaseGenerator,
];

module.exports = {
  usecaseMocksForCompleteCrudGenerator,
  indexForMocksUsecaseGenerator,
  mocksForCreateUsecaseGenerator,
  mocksForDeleteUsecaseGenerator,
  mocksForGetByIdUsecaseGenerator,
  mocksForGetByFilterUsecaseGenerator,
  mocksForUpdateUsecaseGenerator,
};
