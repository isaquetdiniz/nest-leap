const moduleGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/infra/nest/modules/{{snakeCase name}}.module.ts',
  templateFile: 'plop-templates/apps/infra/nest/modules/entity.module.hbs',
};

const moduleIndexGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/infra/nest/modules/index.ts',
  templateFile: 'plop-templates/apps/infra/nest/modules/index.hbs',
};

const infraModuleGenerator = [moduleGenerator, moduleIndexGenerator];

module.exports = {
  infraModuleGenerator,
  moduleGenerator,
  moduleIndexGenerator,
};
