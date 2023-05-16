const usecaseIndexGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/application/usecases/index.ts',
  templateFile: 'plop-templates/apps/application/usecases/index.hbs',
};

const usecaseForCreateFeatureGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/application/usecases/create_{{snakeCase name}}.usecase.ts',
  templateFile:
    'plop-templates/apps/application/usecases/create_entity.usecase.hbs',
};

const usecaseForGetByIdFeatureGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/application/usecases/get_{{snakeCase name}}_by_id.usecase.ts',
  templateFile:
    'plop-templates/apps/application/usecases/get_entity_by_id.usecase.hbs',
};

const usecaseForGetByFilterFeatureGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/application/usecases/get_{{snakeCase name}}s_by_filter.usecase.ts',
  templateFile:
    'plop-templates/apps/application/usecases/get_entities_by_filter.usecase.hbs',
};

const usecaseForDeleteFeatureGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/application/usecases/delete_{{snakeCase name}}_by_id.usecase.ts',
  templateFile:
    'plop-templates/apps/application/usecases/delete_entity_by_id.usecase.hbs',
};

const usecaseForUpdateFeatureGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/application/usecases/update_{{snakeCase name}}.usecase.ts',
  templateFile:
    'plop-templates/apps/application/usecases/update_entity.usecase.hbs',
};

const usecasesForCompleteCrudGenerator = [
  usecaseForCreateFeatureGenerator,
  usecaseForDeleteFeatureGenerator,
  usecaseForGetByIdFeatureGenerator,
  usecaseForGetByFilterFeatureGenerator,
  usecaseForUpdateFeatureGenerator,
  usecaseIndexGenerator,
];

module.exports = {
  usecasesForCompleteCrudGenerator,
  usecaseForCreateFeatureGenerator,
  usecaseForDeleteFeatureGenerator,
  usecaseForGetByIdFeatureGenerator,
  usecaseForGetByFilterFeatureGenerator,
  usecaseForUpdateFeatureGenerator,
  usecaseIndexGenerator,
};
