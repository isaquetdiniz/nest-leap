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
     {
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
    },
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
    {
      type: 'add',
      path: 'src/infra/database/orm/prisma/repositories/{{lowerCase name}}/prisma-create-{{lowerCase name}}-in-database-repository.ts',
      templateFile: 'plop-templates/infra/repositories/Create-Repository.hbs'
    },
    {
      type: 'add',
      path: 'src/infra/database/orm/prisma/repositories/{{lowerCase name}}/prisma-list-{{lowerCase name}}s-in-database-repository.ts',
      templateFile: 'plop-templates/infra/repositories/List-Repository.hbs'
    },
    {
      type: 'add',
      path: 'src/infra/database/orm/prisma/repositories/{{lowerCase name}}/prisma-update-{{lowerCase name}}-in-database-repository.ts',
      templateFile: 'plop-templates/infra/repositories/Update-Repository.hbs'
    },
    {
      type: 'add',
      path: 'src/infra/database/orm/prisma/repositories/{{lowerCase name}}/prisma-delete-{{lowerCase name}}-in-database-repository.ts',
      templateFile: 'plop-templates/infra/repositories/Delete-Repository.hbs'
    },
    {
      type: 'add',
      path: 'src/infra/database/orm/prisma/repositories/{{lowerCase name}}/index.ts',
      templateFile: 'plop-templates/infra/repositories/Repository-Index.hbs'
    },
    {
      type: 'add',
      path: 'src/presentation/http/controllers/{{lowerCase name}}/create-{{lowerCase name}}-controller.ts',
      templateFile: 'plop-templates/presentation/controllers/Create-Controller.hbs'
    },
    {
      type: 'add',
      path: 'src/presentation/http/controllers/{{lowerCase name}}/list-{{lowerCase name}}-controller.ts',
      templateFile: 'plop-templates/presentation/controllers/List-Controller.hbs'
    },
    {
      type: 'add',
      path: 'src/presentation/http/controllers/{{lowerCase name}}/update-{{lowerCase name}}-controller.ts',
      templateFile: 'plop-templates/presentation/controllers/Update-Controller.hbs'
    },
    {
      type: 'add',
      path: 'src/presentation/http/controllers/{{lowerCase name}}/delete-{{lowerCase name}}-controller.ts',
      templateFile: 'plop-templates/presentation/controllers/Delete-Controller.hbs'
    },
    {
      type: 'add',
      path: 'src/presentation/http/controllers/{{lowerCase name}}/index.ts',
      templateFile: 'plop-templates/presentation/controllers/Controller-Index.hbs'
    },
    {
      type: 'add',
      path: 'src/main/factories/infra/database/orm/prisma/repositories/{{lowerCase name}}/prisma-create-{{lowerCase name}}-in-database-repository-factory.ts',
      templateFile: 'plop-templates/factories/repositories/Factory-Create-Repository.hbs'
    },
    {
      type: 'add',
      path: 'src/main/factories/infra/database/orm/prisma/repositories/{{lowerCase name}}/prisma-list-{{lowerCase name}}s-in-database-repository-factory.ts',
      templateFile: 'plop-templates/factories/repositories/Factory-List-Repository.hbs'
    },
    {
      type: 'add',
      path: 'src/main/factories/infra/database/orm/prisma/repositories/{{lowerCase name}}/prisma-update-{{lowerCase name}}-in-database-repository-factory.ts',
      templateFile: 'plop-templates/factories/repositories/Factory-Update-Repository.hbs'
    },
    {
      type: 'add',
      path: 'src/main/factories/infra/database/orm/prisma/repositories/{{lowerCase name}}/prisma-delete-{{lowerCase name}}-in-database-repository-factory.ts',
      templateFile: 'plop-templates/factories/repositories/Factory-Delete-Repository.hbs'
    },
    {
      type: 'add',
      path: 'src/main/factories/infra/database/orm/prisma/repositories/{{lowerCase name}}/index.ts',
      templateFile: 'plop-templates/factories/repositories/Factory-Repository-Index.hbs'
    },
    {
      type: 'add',
      path: 'src/main/factories/validation/{{lowerCase name}}/create-{{lowerCase name}}-validation-factory.ts',
      templateFile: 'plop-templates/factories/validation/Factory-Create-Validation.hbs'
    },
    {
      type: 'add',
      path: 'src/main/factories/validation/{{lowerCase name}}/list-{{lowerCase name}}s-validation-factory.ts',
      templateFile: 'plop-templates/factories/validation/Factory-List-Validation.hbs'
    },
    {
      type: 'add',
      path: 'src/main/factories/validation/{{lowerCase name}}/update-{{lowerCase name}}-validation-factory.ts',
      templateFile: 'plop-templates/factories/validation/Factory-Update-Validation.hbs'
    },
    {
      type: 'add',
      path: 'src/main/factories/validation/{{lowerCase name}}/delete-{{lowerCase name}}-validation-factory.ts',
      templateFile: 'plop-templates/factories/validation/Factory-Delete-Validation.hbs'
    },
    {
      type: 'add',
      path: 'src/main/factories/validation/{{lowerCase name}}/index.ts',
      templateFile: 'plop-templates/factories/validation/Factory-Validation-Index.hbs'
    },
    {
      type: 'add',
      path: 'src/main/factories/services/{{lowerCase name}}/create-{{lowerCase name}}-in-database-service-factory.ts',
      templateFile: 'plop-templates/factories/services/Factory-Create-Service.hbs'
    },
    {
      type: 'add',
      path: 'src/main/factories/services/{{lowerCase name}}/list-{{lowerCase name}}s-in-database-service-factory.ts',
      templateFile: 'plop-templates/factories/services/Factory-List-Service.hbs'
    },
    {
      type: 'add',
      path: 'src/main/factories/services/{{lowerCase name}}/update-{{lowerCase name}}s-in-database-service-factory.ts',
      templateFile: 'plop-templates/factories/services/Factory-Update-Service.hbs'
    },
    {
      type: 'add',
      path: 'src/main/factories/services/{{lowerCase name}}/delete-{{lowerCase name}}s-in-database-service-factory.ts',
      templateFile: 'plop-templates/factories/services/Factory-Delete-Service.hbs'
    },
    {
      type: 'add',
      path: 'src/main/factories/services/{{lowerCase name}}/index.ts',
      templateFile: 'plop-templates/factories/services/Factory-Service-Index.hbs'
    },
    {
      type: 'add',
      path: 'src/main/factories/controllers/{{lowerCase name}}/create-{{lowerCase name}}-controller-factory.ts',
      templateFile: 'plop-templates/factories/controllers/Factory-Create-Controller.hbs'
    },
    {
      type: 'add',
      path: 'src/main/factories/controllers/{{lowerCase name}}/list-{{lowerCase name}}s-controller-factory.ts',
      templateFile: 'plop-templates/factories/controllers/Factory-List-Controller.hbs'
    },
    {
      type: 'add',
      path: 'src/main/factories/controllers/{{lowerCase name}}/update-{{lowerCase name}}-controller-factory.ts',
      templateFile: 'plop-templates/factories/controllers/Factory-Update-Controller.hbs'
    },
    {
      type: 'add',
      path: 'src/main/factories/controllers/{{lowerCase name}}/delete-{{lowerCase name}}-controller-factory.ts',
      templateFile: 'plop-templates/factories/controllers/Factory-Delete-Controller.hbs'
    },
    {
      type: 'add',
      path: 'src/main/factories/controllers/{{lowerCase name}}/index.ts',
      templateFile: 'plop-templates/factories/controllers/Factory-Controller-Index.hbs'
    },
    {
      type: 'add',
      path: 'src/main/routes/{{lowerCase name}}-routes.ts',
      templateFile: 'plop-templates/routes/Entity-Routes.hbs'
    },
    {
      type: 'add',
      path: 'src/main/docs/paths/{{lowerCase name}}-paths.ts',
      templateFile: 'plop-templates/docs/Entity-Paths.hbs'
    },
    {
      type: 'append',
      path: 'src/main/docs/paths/index.ts',
      separator: '',
      template: "export * from './{{lowerCase name}}-paths';\n"
    },
    {
      type: 'modify',
      path: 'src/main/docs/helpers/tags.ts',
      pattern: /\[(.*)\]/gim,
      template: "[$1, '{{name}}s']"
    }
  ]
  })
}
