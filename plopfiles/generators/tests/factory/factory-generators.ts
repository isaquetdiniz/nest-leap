const indexForDefaultEntityGenerator = {
  type: 'add',
  path: 'tests/{{dashCase name}}/factories/index.ts',
  templateFile: 'plop-templates/tests/factories/index.hbs',
};

const factoryForDefaultEntityGenerator = {
  type: 'add',
  path: 'tests/{{dashCase name}}/factories/{{dashCase name}}.factory.ts',
  templateFile: 'plop-templates/tests/factories/entity.factory.hbs',
};

const factoryForEntityGenerator = [
  indexForDefaultEntityGenerator,
  factoryForDefaultEntityGenerator,
];

module.exports = {
  factoryForEntityGenerator,
};
