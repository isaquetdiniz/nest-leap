const mocksForDefaultEntityGenerator = {
  type: 'add',
  path: '__tests__/domains/{{dashCase name}}/entities/mocks/{{dashCase name}}-mocks.ts',
  templateFile: 'plop-templates/__tests__/domains/entities/mocks/entity-mocks.hbs',
}

module.exports = {
  mocksForDefaultEntityGenerator,
};
