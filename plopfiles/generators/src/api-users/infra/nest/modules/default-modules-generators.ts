const apiModuleGenerator = {
  type: 'add',
  path: 'src/apps/api-users/infra/nest/modules/{{snakeCase name}}.module.ts',
  templateFile: 'plop-templates/api-users/infra/nest/modules/entity.module.hbs',
};

const apiInfraModuleGenerator = [apiModuleGenerator];

module.exports = {
  apiInfraModuleGenerator,
  apiModuleGenerator,
};
