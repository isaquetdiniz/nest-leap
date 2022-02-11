import {
  responses,
  security,
  SwaggerContents,
  SwaggerPath,
  SwaggerTypes,
  SwaggerQuery,
  defaultFilterParams,
} from '@/shared/infra/swagger/helpers';

export const testeRatinhoTag = 'TesteRatinho';

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
      responses,
    },
    post: {
      tags: [testeRatinhoTag],
      summary: 'Create a new testeRatinho',
      produces: ['application/json'],
      requestBody: {
        content: SwaggerContents.applicationJson(
          [['name', SwaggerTypes.string(true)]],
          [['name', 'danoninho']]
        ),
      },
      security,
      responses,
    },
  },
  '/teste-ratinhos/{id}': {
    get: {
      tags: [testeRatinhoTag],
      summary: 'Get a TesteRatinho',
      produces: ['application/json'],
      parameters: SwaggerPath.paths([['id', SwaggerTypes.string(), true]]),
      security,
      responses,
    },
    patch: {
      tags: [testeRatinhoTag],
      summary: 'Update a TesteRatinho by id',
      produces: ['application/json'],
      parameters: SwaggerPath.paths([['id', SwaggerTypes.string(), true]]),
      requestBody: {
        content: SwaggerContents.applicationJson(
          [
            ['name', SwaggerTypes.string()],
            ['enabled', SwaggerTypes.boolean()],
          ],
          [
            ['name', 'danoninho'],
            ['enabled', true],
          ]
        ),
      },
      security,
      responses,
    },
    delete: {
      tags: [testeRatinhoTag],
      summary: 'Delete a TesteRatinho by id',
      produces: ['application/json'],
      parameters: SwaggerPath.paths([['id', SwaggerTypes.string(), true]]),
      security,
      responses,
    },
  },
};
