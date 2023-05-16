const apiControllerIndexGenerator = {
  type: 'add',
  path: 'src/apps/api-users/infra/nest/controllers/{{dashCase name}}/index.ts',
  templateFile: 'plop-templates/api-users/infra/nest/controllers/index.hbs',
};

const apiControllerForCreateFeatureGenerator = {
  type: 'add',
  path: 'src/apps/api-users/infra/nest/controllers/{{dashCase name}}/create_{{snakeCase name}}.controller.ts',
  templateFile:
    'plop-templates/api-users/infra/nest/controllers/create_entity.controller.hbs',
};

const apiControllerForGetByIdFeatureGenerator = {
  type: 'add',
  path: 'src/apps/api-users/infra/nest/controllers/{{dashCase name}}/get_{{snakeCase name}}_by_id.controller.ts',
  templateFile:
    'plop-templates/api-users/infra/nest/controllers/get_entity_by_id.controller.hbs',
};

const apiControllerForGetByFilterFeatureGenerator = {
  type: 'add',
  path: 'src/apps/api-users/infra/nest/controllers/{{dashCase name}}/get_{{snakeCase name}}s_by_filter.controller.ts',
  templateFile:
    'plop-templates/api-users/infra/nest/controllers/get_entities_by_filter.controller.hbs',
};

const apiControllerForDeleteFeatureGenerator = {
  type: 'add',
  path: 'src/apps/api-users/infra/nest/controllers/{{dashCase name}}/delete_{{snakeCase name}}_by_id.controller.ts',
  templateFile:
    'plop-templates/api-users/infra/nest/controllers/delete_entity_by_id.controller.hbs',
};

const apiControllerForUpdateFeatureGenerator = {
  type: 'add',
  path: 'src/apps/api-users/infra/nest/controllers/{{dashCase name}}/update_{{snakeCase name}}.controller.ts',
  templateFile:
    'plop-templates/api-users/infra/nest/controllers/update_entity.controller.hbs',
};

const apiControllersForCompleteCrudGenerator = [
  apiControllerForCreateFeatureGenerator,
  apiControllerForDeleteFeatureGenerator,
  apiControllerForGetByIdFeatureGenerator,
  apiControllerForGetByFilterFeatureGenerator,
  apiControllerForUpdateFeatureGenerator,
  apiControllerIndexGenerator,
];

module.exports = {
  apiControllersForCompleteCrudGenerator,
  apiControllerForCreateFeatureGenerator,
  apiControllerForDeleteFeatureGenerator,
  apiControllerForGetByIdFeatureGenerator,
  apiControllerForGetByFilterFeatureGenerator,
  apiControllerForUpdateFeatureGenerator,
  apiControllerIndexGenerator,
};
