import {
  responses,
  security,
  SwaggerContents,
  SwaggerPath,
  SwaggerTypes,
  SwaggerQuery,
  defaultFilterParams,
} from '@/shared/infra/swagger/helpers';

export const userTag = 'Users';

export const userPaths = {
  '/users': {
    get: {
      tags: [userTag],
      summary: 'Get Users',
      produces: ['application/json'],
      parameters: [
        ...SwaggerQuery.params([
          ['name', SwaggerTypes.string()],
          ['email', SwaggerTypes.string()],
          ['isAdmin', SwaggerTypes.boolean()],
          ['enabled', SwaggerTypes.boolean()],
        ]),
        ...defaultFilterParams,
      ],
      security,
      responses,
    },
    post: {
      tags: [userTag],
      summary: 'Create a new user',
      produces: ['application/json'],
      requestBody: {
        content: SwaggerContents.applicationJson(
          [
            ['name', SwaggerTypes.string(true)],
            ['email', SwaggerTypes.string(true)],
            ['isAdmin', SwaggerTypes.boolean(true)],
          ],
          [
            ['name', 'danoninho'],
            ['email', 'abc@loomi.com.br'],
            ['isAdmin', true],
          ]
        ),
      },
      security,
      responses,
    },
  },
  '/users/{id}': {
    get: {
      tags: [userTag],
      summary: 'Get a User',
      produces: ['application/json'],
      parameters: SwaggerPath.paths([['id', SwaggerTypes.string(), true]]),
      security,
      responses,
    },
    patch: {
      tags: [userTag],
      summary: 'Update a User by id',
      produces: ['application/json'],
      parameters: SwaggerPath.paths([['id', SwaggerTypes.string(), true]]),
      requestBody: {
        content: SwaggerContents.applicationJson(
          [
            ['name', SwaggerTypes.string()],
            ['isAdmin', SwaggerTypes.boolean()],
            ['enabled', SwaggerTypes.boolean()],
          ],
          [
            ['name', 'danoninho'],
            ['isAdmin', true],
            ['enabled', true],
          ]
        ),
      },
      security,
      responses,
    },
    delete: {
      tags: ['Users'],
      summary: 'Delete a User by id',
      produces: ['application/json'],
      parameters: SwaggerPath.paths([['id', SwaggerTypes.string(), true]]),
      security,
      responses,
    },
  },
};
