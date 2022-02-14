import {
  security,
  SwaggerContents,
  SwaggerPath,
  SwaggerSchemas,
  SwaggerTypes,
  SwaggerQuery,
  defaultFilterParams,
  defaultResponses,
  SwaggerResponse,
} from '@/shared/infra/swagger/helpers';

export const testeRatinhoTag = 'TesteRatinhos';

export const testeRatinhoSchema = SwaggerSchemas.create('TesteRatinho', [
  ['id', SwaggerTypes.uuid(true)],
  ['name', SwaggerTypes.string(true)],
  ['enabled', SwaggerTypes.boolean(true)],
  ['createdAt', SwaggerTypes.dateTime(true)],
  ['updatedAt', SwaggerTypes.dateTime(true)],
]);

const testeRatinhoObject = SwaggerTypes.object(true, [
  ['id', SwaggerTypes.uuid(true)],
  ['name', SwaggerTypes.string(true)],
  ['enabled', SwaggerTypes.boolean(true)],
  ['createdAt', SwaggerTypes.dateTime(true)],
  ['updatedAt', SwaggerTypes.dateTime(true)],
]);

export const testeRatinhoPaths = {
  '/teste-ratinhos': {
    get: {
      tags: [testeRatinhoTag],
      summary: 'Get TesteRatinhos',
      produces: ['application/json'],
      parameters: [
        ...SwaggerQuery.params([
          ['name', SwaggerTypes.string()],
          ['enabled', SwaggerTypes.boolean()],
        ]),
        ...defaultFilterParams,
      ],
      security,
      responses: {
        ...SwaggerResponse.ok(
          'TesteRatinhos found',
          SwaggerContents.applicationJson([
            ['items', SwaggerTypes.array(true, testeRatinhoObject, 100)],
            ['totalItemsListed', SwaggerTypes.integer()],
            ['totalItems', SwaggerTypes.integer()],
          ])
        ),
        ...defaultResponses,
      },
    },
    post: {
      tags: [testeRatinhoTag],
      summary: 'Create a new testeRatinho',
      produces: ['application/json'],
      requestBody: {
        content: SwaggerContents.applicationJson([
          ['name', SwaggerTypes.string(true)],
        ]),
      },
      security,
      responses: {
        ...SwaggerResponse.ok(
          'TesteRatinho created',
          SwaggerContents.applicationJson([], [], testeRatinhoObject)
        ),
        ...defaultResponses,
      },
    },
  },
  '/teste-ratinhos/{id}': {
    get: {
      tags: [testeRatinhoTag],
      summary: 'Get a TesteRatinho',
      produces: ['application/json'],
      parameters: SwaggerPath.paths([['id', SwaggerTypes.uuid(), true]]),
      security,
      responses: {
        ...SwaggerResponse.ok(
          'TesteRatinho found',
          SwaggerContents.applicationJson([], [], testeRatinhoObject)
        ),
        ...SwaggerResponse.notFound('TesteRatinho not found'),
        ...defaultResponses,
      },
    },
    patch: {
      tags: [testeRatinhoTag],
      summary: 'Update a TesteRatinho by id',
      produces: ['application/json'],
      parameters: SwaggerPath.paths([['id', SwaggerTypes.uuid(), true]]),
      requestBody: {
        content: SwaggerContents.applicationJson([
          ['name', SwaggerTypes.string()],
          ['enabled', SwaggerTypes.boolean()],
        ]),
      },
      security,
      responses: {
        ...SwaggerResponse.ok(
          'TesteRatinho updated',
          SwaggerContents.applicationJson([], [], testeRatinhoObject)
        ),
        ...SwaggerResponse.notFound('TesteRatinho not found'),
        ...defaultResponses,
      },
    },
    delete: {
      tags: [testeRatinhoTag],
      summary: 'Delete a TesteRatinho by id',
      produces: ['application/json'],
      parameters: SwaggerPath.paths([['id', SwaggerTypes.uuid(), true]]),
      security,
      responses: {
        ...SwaggerResponse.ok('TesteRatinho updated'),
        ...SwaggerResponse.notFound('TesteRatinho not found'),
        ...defaultResponses,
      },
    },
  },
};
