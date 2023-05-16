const controllerIndexGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/interface/controllers/index.ts',
  templateFile: 'plop-templates/apps/interface/controllers/index.hbs',
};

const controllerForCreateFeatureGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/interface/controllers/create_{{snakeCase name}}.controller.ts',
  templateFile:
    'plop-templates/apps/interface/controllers/create_entity.controller.hbs',
};

const controllerForGetByIdFeatureGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/interface/controllers/get_{{snakeCase name}}_by_id.controller.ts',
  templateFile:
    'plop-templates/apps/interface/controllers/get_entity_by_id.controller.hbs',
};

const controllerForGetByFilterFeatureGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/interface/controllers/get_{{snakeCase name}}s_by_filter.controller.ts',
  templateFile:
    'plop-templates/apps/interface/controllers/get_entities_by_filter.controller.hbs',
};

const controllerForDeleteFeatureGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/interface/controllers/delete_{{snakeCase name}}_by_id.controller.ts',
  templateFile:
    'plop-templates/apps/interface/controllers/delete_entity_by_id.controller.hbs',
};

const controllerForUpdateFeatureGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/interface/controllers/update_{{snakeCase name}}.controller.ts',
  templateFile:
    'plop-templates/apps/interface/controllers/update_entity.controller.hbs',
};

const controllersForCompleteCrudGenerator = [
  controllerForCreateFeatureGenerator,
  controllerForDeleteFeatureGenerator,
  controllerForGetByIdFeatureGenerator,
  controllerForGetByFilterFeatureGenerator,
  controllerForUpdateFeatureGenerator,
  controllerIndexGenerator,
];

module.exports = {
  controllersForCompleteCrudGenerator,
  controllerForCreateFeatureGenerator,
  controllerForDeleteFeatureGenerator,
  controllerForGetByIdFeatureGenerator,
  controllerForGetByFilterFeatureGenerator,
  controllerForUpdateFeatureGenerator,
  controllerIndexGenerator,
};
