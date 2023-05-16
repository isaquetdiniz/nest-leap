const prismaGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/infra/prisma/repos/prisma_{{snakeCase name}}.repository.ts',
  templateFile: 'plop-templates/apps/infra/prisma/repos/entity.repository.hbs',
};

const prismaIndexGenerator = {
  type: 'add',
  path: 'src/apps/{{dashCase name}}/infra/prisma/repos/index.ts',
  templateFile: 'plop-templates/apps/infra/prisma/repos/index.hbs',
};

const schemaPrismaAppendModelGenerator = {
  type: 'append',
  path: 'src/libs/prisma/schema.prisma',
  separator: '',
  templateFile: 'plop-templates/apps/infra/prisma/prisma-schema.hbs',
};

const infraPrismaGenerator = [
  prismaGenerator,
  prismaIndexGenerator,
  schemaPrismaAppendModelGenerator,
];

module.exports = {
  infraPrismaGenerator,
  prismaGenerator,
  prismaIndexGenerator,
};
