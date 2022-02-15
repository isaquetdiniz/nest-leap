const inputName = {
  type: 'input',
  name: 'name',
  message: 'Name of entity',
};

const domain = [
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/entities/{{dashCase name}}.ts',
    templateFile: 'plop-templates/domains/entities/entity.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/entities/{{dashCase name}}-transformer.ts',
    templateFile: 'plop-templates/domains/entities/entity-transformer.hbs',
  },
];

const usecasesExceptions = [
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/usecases/exceptions/{{dashCase name}}-not-found-exception.ts',
    templateFile:
      'plop-templates/domains/usecases/exceptions/entity-not-found-exception.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/usecases/exceptions/{{dashCase name}}-already-exists-exception.ts',
    templateFile:
      'plop-templates/domains/usecases/exceptions/entity-already-exists-exception.hbs',
  },
];

const usecasesRepos = [
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/usecases/repos/count-{{dashCase name}}s-by-filter-repository.ts',
    templateFile:
      'plop-templates/domains/usecases/repos/count-entities-by-filter-repository.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/usecases/repos/get-{{dashCase name}}-by-id-repository.ts',
    templateFile:
      'plop-templates/domains/usecases/repos/get-entity-by-id-repository.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/usecases/repos/delete-{{dashCase name}}-by-id-repository.ts',
    templateFile:
      'plop-templates/domains/usecases/repos/delete-entity-by-id-repository.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/usecases/repos/save-{{dashCase name}}-repository.ts',
    templateFile:
      'plop-templates/domains/usecases/repos/save-entity-repository.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/usecases/repos/get-{{dashCase name}}s-by-filter-repository.ts',
    templateFile:
      'plop-templates/domains/usecases/repos/get-entities-by-filter-repository.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/usecases/repos/update-{{dashCase name}}-repository.ts',
    templateFile:
      'plop-templates/domains/usecases/repos/update-entity-repository.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/usecases/repos/get-{{dashCase name}}-by-name-repository.ts',
    templateFile:
      'plop-templates/domains/usecases/repos/get-entity-by-name-repository.hbs',
  },
];

const usecases = [
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/usecases/create-{{dashCase name}}-usecase.ts',
    templateFile: 'plop-templates/domains/usecases/create-entity-usecase.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/usecases/get-{{dashCase name}}-by-id-usecase.ts',
    templateFile:
      'plop-templates/domains/usecases/get-entity-by-id-usecase.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/usecases/get-{{dashCase name}}s-by-filter-usecase.ts',
    templateFile:
      'plop-templates/domains/usecases/get-entities-by-filter-usecase.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/usecases/delete-{{dashCase name}}-by-id-usecase.ts',
    templateFile:
      'plop-templates/domains/usecases/delete-entity-by-id-usecase.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/usecases/update-{{dashCase name}}-by-id-usecase.ts',
    templateFile:
      'plop-templates/domains/usecases/update-entity-by-id-usecase.hbs',
  },
];

const interfaceControllers = [
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/interface/controllers/create-{{dashCase name}}-controller.ts',
    templateFile:
      'plop-templates/domains/interface/controllers/create-entity-controller.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/interface/controllers/get-{{dashCase name}}-by-id-controller.ts',
    templateFile:
      'plop-templates/domains/interface/controllers/get-entity-by-id-controller.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/interface/controllers/delete-{{dashCase name}}-by-id-controller.ts',
    templateFile:
      'plop-templates/domains/interface/controllers/delete-entity-by-id-controller.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/interface/controllers/update-{{dashCase name}}-by-id-controller.ts',
    templateFile:
      'plop-templates/domains/interface/controllers/update-entity-by-id-controller.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/interface/controllers/get-{{dashCase name}}s-by-filter-controller.ts',
    templateFile:
      'plop-templates/domains/interface/controllers/get-entities-by-filter-controller.hbs',
  },
];

const interfaceHttoControllers = [
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/interface/http/http-create-{{dashCase name}}-controller.ts',
    templateFile:
      'plop-templates/domains/interface/http/http-create-entity-controller.hbs',
  },

  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/interface/http/http-delete-{{dashCase name}}-by-id-controller.ts',
    templateFile:
      'plop-templates/domains/interface/http/http-delete-entity-by-id-controller.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/interface/http/http-get-{{dashCase name}}-by-id-controller.ts',
    templateFile:
      'plop-templates/domains/interface/http/http-get-entity-by-id-controller.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/interface/http/http-update-{{dashCase name}}-by-id-controller.ts',
    templateFile:
      'plop-templates/domains/interface/http/http-update-entity-by-id-controller.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/interface/http/http-get-{{dashCase name}}s-by-filter-controller.ts',
    templateFile:
      'plop-templates/domains/interface/http/http-get-entities-by-filter-controller.hbs',
  },
];

const interfaceValidators = [
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/interface/validation/create-{{dashCase name}}-validation.ts',
    templateFile:
      'plop-templates/domains/interface/validation/create-entity-validation.hbs',
  },

  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/interface/validation/delete-{{dashCase name}}-by-id-validation.ts',
    templateFile:
      'plop-templates/domains/interface/validation/delete-entity-by-id-validation.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/interface/validation/get-{{dashCase name}}-by-id-validation.ts',
    templateFile:
      'plop-templates/domains/interface/validation/get-entity-by-id-validation.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/interface/validation/update-{{dashCase name}}-by-id-validation.ts',
    templateFile:
      'plop-templates/domains/interface/validation/update-entity-by-id-validation.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/interface/validation/get-{{dashCase name}}s-by-filter-validation.ts',
    templateFile:
      'plop-templates/domains/interface/validation/get-entities-by-filter-validation.hbs',
  },
];

const infraPrisma = [
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/infra/prisma/repositories/prisma-save-{{dashCase name}}-repository.ts',
    templateFile:
      'plop-templates/domains/infra/prisma/prisma-save-entity-repository.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/infra/prisma/repositories/prisma-count-{{dashCase name}}s-by-filter-repository.ts',
    templateFile:
      'plop-templates/domains/infra/prisma/prisma-count-entities-by-filter-repository.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/infra/prisma/repositories/prisma-delete-{{dashCase name}}-by-id-repository.ts',
    templateFile:
      'plop-templates/domains/infra/prisma/prisma-delete-entity-by-id-repository.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/infra/prisma/repositories/prisma-get-{{dashCase name}}-by-id-repository.ts',
    templateFile:
      'plop-templates/domains/infra/prisma/prisma-get-entity-by-id-repository.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/infra/prisma/repositories/prisma-get-{{dashCase name}}-by-name-repository.ts',
    templateFile:
      'plop-templates/domains/infra/prisma/prisma-get-entity-by-name-repository.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/infra/prisma/repositories/prisma-get-{{dashCase name}}s-by-filter-repository.ts',
    templateFile:
      'plop-templates/domains/infra/prisma/prisma-get-entities-by-filter-repository.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/infra/prisma/repositories/prisma-update-{{dashCase name}}-repository.ts',
    templateFile:
      'plop-templates/domains/infra/prisma/prisma-update-entity-repository.hbs',
  },
  {
    type: 'append',
    path: 'src/main/infra/prisma/schema.prisma',
    separator: '',
    templateFile: 'plop-templates/domains/infra/prisma/prisma-schema.hbs',
  },
];

const infraSwagger = [
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/infra/swagger/{{dashCase name}}-paths.ts',
    templateFile: 'plop-templates/domains/infra/swagger/entity-paths.hbs',
  },
];

const factoriesHttp = [
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/factories/http/http-create-{{dashCase name}}-controller-factory.ts',
    templateFile:
      'plop-templates/domains/factories/http/http-create-entity-controller-factory.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/factories/http/http-get-{{dashCase name}}-by-id-controller-factory.ts',
    templateFile:
      'plop-templates/domains/factories/http/http-get-entity-by-id-controller-factory.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/factories/http/http-delete-{{dashCase name}}-by-id-controller-factory.ts',
    templateFile:
      'plop-templates/domains/factories/http/http-delete-entity-by-id-controller-factory.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/factories/http/http-update-{{dashCase name}}-by-id-controller-factory.ts',
    templateFile:
      'plop-templates/domains/factories/http/http-update-entity-by-id-controller-factory.hbs',
  },
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/factories/http/http-get-{{dashCase name}}s-by-filter-controller-factory.ts',
    templateFile:
      'plop-templates/domains/factories/http/http-get-entities-by-filter-controller-factory.hbs',
  },
];

const infraExpress = [
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/infra/express/{{dashCase name}}-routes.ts',
    templateFile: 'plop-templates/domains/infra/express/entity-routes.hbs',
  },
];

const index = [
  {
    type: 'add',
    path: 'src/domains/{{dashCase name}}/index.ts',
    templateFile: 'plop-templates/domains/index.hbs',
  },
];

module.exports = function (plop) {
  plop.setGenerator('[NEW DOMAIN]: Create new Domain', {
    description: 'Generate a new domain',
    prompts: [inputName],
    actions: [
      ...domain,
      ...usecasesExceptions,
      ...usecasesRepos,
      ...usecases,
      ...interfaceControllers,
      ...interfaceHttoControllers,
      ...interfaceValidators,
      ...infraPrisma,
      ...infraSwagger,
      ...infraExpress,
      ...factoriesHttp,
      ...index,
    ],
  });
};
