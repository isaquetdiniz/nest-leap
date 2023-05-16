const exceptionIndexGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/application/exceptions/index.ts',
  templateFile: 'plop-templates/apps/application/exceptions/index.hbs',
};

const notFoundExceptionGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/application/exceptions/{{snakeCase name}}_not_found.exception.ts',
  templateFile:
    'plop-templates/apps/application/exceptions/entity_not_found.exception.hbs',
};

const alreadyExistsExceptionGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/application/exceptions/{{snakeCase name}}_already_exists.exception.ts',
  templateFile:
    'plop-templates/apps/application/exceptions/entity_already_exists.exception.hbs',
};

const exceptionsForCompleteCrudGenerator = [
  notFoundExceptionGenerator,
  alreadyExistsExceptionGenerator,
  exceptionIndexGenerator,
];

module.exports = {
  exceptionsForCompleteCrudGenerator,
  notFoundExceptionGenerator,
  alreadyExistsExceptionGenerator,
  exceptionIndexGenerator,
};
