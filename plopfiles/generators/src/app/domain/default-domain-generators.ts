const classEntityGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/domain/entities/{{snakeCase name}}.entity.ts',
  templateFile: 'plop-templates/apps/domain/entities/entity.entity.hbs',
};

const indexEntityGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/domain/index.ts',
  templateFile: 'plop-templates/apps/domain/index.hbs',
};

const domainEntityGenerator = [classEntityGenerator, indexEntityGenerator];

module.exports = {
  indexEntityGenerator,
  domainEntityGenerator,
  classEntityGenerator,
};
