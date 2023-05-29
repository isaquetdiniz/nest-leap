const testsForCreateServiceGenerator = {
  type: 'add',
  path: 'tests/{{dashCase name}}/nest/services/create_{{dashCase name}}.service.spec.ts',
  templateFile:
    'plop-templates/tests/infra/nest/services/create_entity.service.spec.hbs',
};

const testsForDeleteServiceGenerator = {
  type: 'add',
  path: 'tests/{{dashCase name}}/nest/services/delete_{{dashCase name}}_by_id.service.spec.ts',
  templateFile:
    'plop-templates/tests/infra/nest/services/delete_entity_by_id.service.spec.hbs',
};

const testsForGetServiceGenerator = {
  type: 'add',
  path: 'tests/{{dashCase name}}/nest/services/get_{{dashCase name}}_by_filter.service.spec.ts',
  templateFile:
    'plop-templates/tests/infra/nest/services/get_entity_by_filter.service.spec.hbs',
};

const testsForGetByIdServiceGenerator = {
  type: 'add',
  path: 'tests/{{dashCase name}}/nest/services/get_{{dashCase name}}_by_id.service.spec.ts',
  templateFile:
    'plop-templates/tests/infra/nest/services/get_entity_by_id.service.spec.hbs',
};

const testsForUpdateServiceGenerator = {
  type: 'add',
  path: 'tests/{{dashCase name}}/nest/services/update_{{dashCase name}}.service.spec.ts',
  templateFile:
    'plop-templates/tests/infra/nest/services/update_entity.service.spec.hbs',
};

const infraTestsForCompleteCrudsGenerator = [
  testsForCreateServiceGenerator,
  testsForDeleteServiceGenerator,
  testsForGetServiceGenerator,
  testsForGetByIdServiceGenerator,
  testsForUpdateServiceGenerator,
];

module.exports = {
  testsForCreateServiceGenerator,
  testsForDeleteServiceGenerator,
  testsForGetServiceGenerator,
  testsForGetByIdServiceGenerator,
  testsForUpdateServiceGenerator,
  infraTestsForCompleteCrudsGenerator,
};
