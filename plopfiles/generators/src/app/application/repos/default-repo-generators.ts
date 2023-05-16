const repoIndexGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/application/repos/index.ts',
  templateFile: 'plop-templates/apps/application/repos/index.hbs',
};

const repoGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/application/repos/{{snakeCase name}}.repository.ts',
  templateFile: 'plop-templates/apps/application/repos/entity.repository.hbs',
};

const repoForCompleteCrudGenerator = [repoIndexGenerator, repoGenerator];

module.exports = {
  repoForCompleteCrudGenerator,
  repoIndexGenerator,
  repoGenerator,
};
