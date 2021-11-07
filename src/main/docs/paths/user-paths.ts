import { responses, filterParams } from '@/main/docs/helpers';

export const userPaths = {
  '/users': {
    get: {
      tags: ['Users'],
      summary: 'Get a User or Users',
      produces: ['application/json'],
      parameters: [...filterParams],
      security: [{ BearerAuth: [] }],
      responses,
    },
    post: {
      tags: ['Users'],
      summary: 'Create a new user',
      produces: ['application/json'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/createUserSchema',
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses,
    },
  },
  '/users/{id}': {
    get: {
      tags: ['Users'],
      summary: 'Get a User or Users',
      produces: ['application/json'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          schema: {
            type: 'string',
            format: 'uuid',
          },
          required: true,
        },
      ],
      security: [{ BearerAuth: [] }],
      responses,
    },
    patch: {
      tags: ['Users'],
      summary: 'Update a User by id',
      produces: ['application/json'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          schema: {
            type: 'string',
            format: 'uuid',
          },
          required: true,
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/updateUserSchema',
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses,
    },
    delete: {
      tags: ['Users'],
      summary: 'Delete a User by id',
      produces: ['application/json'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          schema: {
            type: 'string',
            format: 'uuid',
          },
          required: true,
        },
      ],
      security: [{ BearerAuth: [] }],
      responses,
    },
  },
};
