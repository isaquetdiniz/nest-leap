const serviceIndexGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/infra/nest/services/index.ts',
  templateFile: 'plop-templates/apps/infra/nest/services/index.hbs',
};

const serviceForCreateFeatureGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/infra/nest/services/create_{{snakeCase name}}.service.ts',
  templateFile:
    'plop-templates/apps/infra/nest/services/create_entity.service.hbs',
};

const serviceForGetByIdFeatureGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/infra/nest/services/get_{{snakeCase name}}_by_id.service.ts',
  templateFile:
    'plop-templates/apps/infra/nest/services/get_entity_by_id.service.hbs',
};

const serviceForGetByFilterFeatureGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/infra/nest/services/get_{{snakeCase name}}s_by_filter.service.ts',
  templateFile:
    'plop-templates/apps/infra/nest/services/get_entities_by_filter.service.hbs',
};

const serviceForDeleteFeatureGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/infra/nest/services/delete_{{snakeCase name}}_by_id.service.ts',
  templateFile:
    'plop-templates/apps/infra/nest/services/delete_entity_by_id.service.hbs',
};

const serviceForUpdateFeatureGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/infra/nest/services/update_{{snakeCase name}}.service.ts',
  templateFile:
    'plop-templates/apps/infra/nest/services/update_entity.service.hbs',
};

const servicesForCompleteCrudGenerator = [
  serviceForCreateFeatureGenerator,
  serviceForDeleteFeatureGenerator,
  serviceForGetByIdFeatureGenerator,
  serviceForGetByFilterFeatureGenerator,
  serviceForUpdateFeatureGenerator,
  serviceIndexGenerator,
];

module.exports = {
  servicesForCompleteCrudGenerator,
  serviceForCreateFeatureGenerator,
  serviceForDeleteFeatureGenerator,
  serviceForGetByIdFeatureGenerator,
  serviceForGetByFilterFeatureGenerator,
  serviceForUpdateFeatureGenerator,
  serviceIndexGenerator,
};
