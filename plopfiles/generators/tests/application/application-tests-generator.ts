const testsForCreateUseCaseGenerator = {
  type: 'add',
  path: 'tests/{{dashCase name}}/application/usecases/create_{{dashCase name}}.usecase.spec.ts',
  templateFile:
    'plop-templates/tests/application/usecases/create_entity_usecase.spec.hbs',
};

const testsForDeleteUseCaseGenerator = {
  type: 'add',
  path: 'tests/{{dashCase name}}/application/usecases/delete_{{dashCase name}}_by_id.usecase.spec.ts',
  templateFile:
    'plop-templates/tests/application/usecases/delete_entity_by_id_usecase.spec.hbs',
};

const testsForGetByIdUseCaseGenerator = {
  type: 'add',
  path: 'tests/{{dashCase name}}/application/usecases/get_{{dashCase name}}_by_id.usecase.spec.ts',
  templateFile:
    'plop-templates/tests/application/usecases/get_entity_by_id_usecase.spec.hbs',
};

const testsForGetByFilterUseCaseGenerator = {
  type: 'add',
  path: 'tests/{{dashCase name}}/application/usecases/get_{{dashCase name}}s_by_filter.usecase.spec.ts',
  templateFile:
    'plop-templates/tests/application/usecases/get_entitys_by_filter_usecase.spec.hbs',
};

const testsForUpdateUseCaseGenerator = {
  type: 'add',
  path: 'tests/{{dashCase name}}/application/usecases/update_{{dashCase name}}.usecase.spec.ts',
  templateFile:
    'plop-templates/tests/application/usecases/update_entity_usecase.spec.hbs',
};

const usecaseTestsForCompleteCrudGenerator = [
  testsForCreateUseCaseGenerator,
  testsForDeleteUseCaseGenerator,
  testsForGetByIdUseCaseGenerator,
  testsForGetByFilterUseCaseGenerator,
  testsForUpdateUseCaseGenerator,
];

module.exports = {
  usecaseTestsForCompleteCrudGenerator,
  testsForCreateUseCaseGenerator,
  testsForDeleteUseCaseGenerator,
  testsForGetByIdUseCaseGenerator,
  testsForGetByFilterUseCaseGenerator,
  testsForUpdateUseCaseGenerator,
};
