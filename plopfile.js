module.exports = function (plop) {
  // controller generator
  plop.setGenerator('Basic Entity CRUD', {
    description: 'A basic entity with name CRUD',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'Name of entity'
    }],
    actions: [
    /* {
      type: 'add',
      path: 'src/domain/entities/{{name}}.ts',
      templateFile: 'plop-templates/domain/Entity.hbs'
    },
    {
      type: 'append',
      path: 'src/domain/entities/index.ts',
      separator: '',
      template: "export * from './{{name}}';"
    },
    {
      type: 'add',
      path: 'src/domain/errors/{{name}}Error.ts',
      templateFile: 'plop-templates/domain/Entity-error.hbs'
    },
    {
      type: 'append',
      path: 'src/domain/errors/index.ts',
      separator: '',
      template: "export * from './{{name}}Error';"
    },
    {
      type: 'add',
      path: 'src/domain/usecases/{{lowerCase name}}/create-{{lowerCase name}}-usecase.ts',
      templateFile: 'plop-templates/domain/usecases/Entity-Create-Domain.hbs'
    },
    {
      type: 'add',
      path: 'src/domain/usecases/{{lowerCase name}}/list-{{lowerCase name}}s-usecase.ts',
      templateFile: 'plop-templates/domain/usecases/Entity-List-Domain.hbs'
    },
    {
      type: 'add',
      path: 'src/domain/usecases/{{lowerCase name}}/update-{{lowerCase name}}-usecase.ts',
      templateFile: 'plop-templates/domain/usecases/Entity-Update-Domain.hbs'
    },
    {
      type: 'add',
      path: 'src/domain/usecases/{{lowerCase name}}/delete-{{lowerCase name}}-usecase.ts',
      templateFile: 'plop-templates/domain/usecases/Entity-Delete-Domain.hbs'
    },
    {
      type: 'add',
      path: 'src/domain/usecases/{{lowerCase name}}/index.ts',
      templateFile: 'plop-templates/domain/usecases/Entity-Index-Usecases-Domain.hbs'
    },
    {
      type: 'add',
      path: 'src/application/errors/repositories/{{lowerCase name}}/create-{{lowerCase name}}-repository-error.ts',
      templateFile: 'plop-templates/application/errors/repositories/Create-Repository-Error.hbs'
    },
    {
      type: 'add',
      path: 'src/application/errors/repositories/{{lowerCase name}}/list-{{lowerCase name}}s-repository-error.ts',
      templateFile: 'plop-templates/application/errors/repositories/List-Repository-Error.hbs'
    },
    {
      type: 'add',
      path: 'src/application/errors/repositories/{{lowerCase name}}/count-{{lowerCase name}}s-repository-error.ts',
      templateFile: 'plop-templates/application/errors/repositories/Count-Repository-Error.hbs'
    },
    {
      type: 'add',
      path: 'src/application/errors/repositories/{{lowerCase name}}/update-{{lowerCase name}}-repository-error.ts',
      templateFile: 'plop-templates/application/errors/repositories/Update-Repository-Error.hbs'
    },
    {
      type: 'add',
      path: 'src/application/errors/repositories/{{lowerCase name}}/delete-{{lowerCase name}}-repository-error.ts',
      templateFile: 'plop-templates/application/errors/repositories/Delete-Repository-Error.hbs'
    },
    {
      type: 'add',
      path: 'src/application/errors/repositories/{{lowerCase name}}/index.ts',
      templateFile: 'plop-templates/application/errors/repositories/Repository-Error-Index.hbs'
    },
    {
      type: 'add',
      path: 'src/application/errors/services/{{lowerCase name}}/create-{{lowerCase name}}-service-error.ts',
      templateFile: 'plop-templates/application/errors/services/Create-Service-Error.hbs'
    },
    {
      type: 'add',
      path: 'src/application/errors/services/{{lowerCase name}}/list-{{lowerCase name}}s-service-error.ts',
      templateFile: 'plop-templates/application/errors/services/List-Service-Error.hbs'
    },
    {
      type: 'add',
      path: 'src/application/errors/services/{{lowerCase name}}/update-{{lowerCase name}}-service-error.ts',
      templateFile: 'plop-templates/application/errors/services/Update-Service-Error.hbs'
    },
    {
      type: 'add',
      path: 'src/application/errors/services/{{lowerCase name}}/delete-{{lowerCase name}}-service-error.ts',
      templateFile: 'plop-templates/application/errors/services/Delete-Service-Error.hbs'
    },
    {
      type: 'add',
      path: 'src/application/errors/services/{{lowerCase name}}/index.ts',
      templateFile: 'plop-templates/application/errors/services/Service-Error-Index.hbs'
    },
    {
      type: 'add',
      path: 'src/application/protocols/database/repositories/{{lowerCase name}}/create-{{lowerCase name}}-in-database-repository.ts',
      templateFile: 'plop-templates/application/protocols/repositories/Create-Repository.hbs'
    },
    {
      type: 'add',
      path: 'src/application/protocols/database/repositories/{{lowerCase name}}/list-{{lowerCase name}}s-in-database-repository.ts',
      templateFile: 'plop-templates/application/protocols/repositories/List-Repository.hbs'
    },
    {
      type: 'add',
      path: 'src/application/protocols/database/repositories/{{lowerCase name}}/count-{{lowerCase name}}s-in-database-repository.ts',
      templateFile: 'plop-templates/application/protocols/repositories/Count-Repository.hbs'
    },
    {
      type: 'add',
      path: 'src/application/protocols/database/repositories/{{lowerCase name}}/update-{{lowerCase name}}-in-database-repository.ts',
      templateFile: 'plop-templates/application/protocols/repositories/Update-Repository.hbs'
    },
    {
      type: 'add',
      path: 'src/application/protocols/database/repositories/{{lowerCase name}}/delete-{{lowerCase name}}-in-database-repository.ts',
      templateFile: 'plop-templates/application/protocols/repositories/Delete-Repository.hbs'
    },
    {
      type: 'add',
      path: 'src/application/protocols/database/repositories/{{lowerCase name}}/index.ts',
      templateFile: 'plop-templates/application/protocols/repositories/Repository-Index.hbs'
    }, */
    {
      type: 'add',
      path: 'src/application/services/{{lowerCase name}}/create-{{lowerCase name}}-in-database-service.ts',
      templateFile: 'plop-templates/application/services/Create-Service.hbs'
    },
    {
      type: 'add',
      path: 'src/application/services/{{lowerCase name}}/list-{{lowerCase name}}-in-database-service.ts',
      templateFile: 'plop-templates/application/services/List-Service.hbs'
    },
    {
      type: 'add',
      path: 'src/application/services/{{lowerCase name}}/update-{{lowerCase name}}-in-database-service.ts',
      templateFile: 'plop-templates/application/services/Update-Service.hbs'
    },
    {
      type: 'add',
      path: 'src/application/services/{{lowerCase name}}/delete-{{lowerCase name}}-in-database-service.ts',
      templateFile: 'plop-templates/application/services/Delete-Service.hbs'
    },
    {
      type: 'add',
      path: 'src/application/services/{{lowerCase name}}/index.ts',
      templateFile: 'plop-templates/application/services/Service-Index.hbs'
    },
  ]
  })
}
