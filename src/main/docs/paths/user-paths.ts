import { responses } from '@/main/docs/helpers';

export const userPaths = {
  '/user': {
    post: {
      tags: ['User'],
      summary: 'Create a new user',
      produces: ['application/json'],
      requestBody: {
        content: {
          'multipart/form-data': {
            schema: {
              $ref: '#/schemas/user',
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses,
    },
  },
  '/user/first-access': {
    post: {
      tags: ['User'],
      summary: 'First Access of user',
      produces: ['application/json'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/firstAccess',
            },
            example: {
              email: 'any_email@mail.com',
              temporaryPassword: 'batatinha',
              newPassword: 'batatão',
            },
          },
        },
      },
      responses,
    },
  },
  '/user/forgot-password': {
    post: {
      tags: ['User'],
      summary: 'Forgot Password',
      produces: ['application/json'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                },
              },
            },
            example: {
              email: 'any_email@mail.com',
            },
          },
        },
      },
      responses,
    },
  },
  '/user/confirm-forgot-password': {
    post: {
      tags: ['User'],
      summary: 'Confirm Forgot Password',
      produces: ['application/json'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                },
                confirmationCode: {
                  type: 'string',
                },
                newPassword: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses,
    },
  },
  '/user/{id}': {
    get: {
      tags: ['User'],
      summary: 'Get a User by filter, or Users',
      produces: ['application/json'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          schema: {
            type: 'string',
            format: 'uuid',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'search',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'name',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'enabled',
          schema: {
            type: 'boolean',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'email',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'roles',
          schema: {
            type: 'array',
            items: {
              type: 'string',
              format: 'uuid',
            },
          },
          required: false,
        },
        {
          in: 'query',
          name: 'regionsIds',
          schema: {
            type: 'array',
            items: {
              type: 'string',
              format: 'uuid',
            },
          },
          required: false,
        },
        {
          in: 'query',
          name: 'typesOperatorsIds',
          schema: {
            type: 'array',
            items: {
              type: 'string',
              format: 'uuid',
            },
          },
          required: false,
        },
        {
          in: 'query',
          name: 'areasIds',
          schema: {
            type: 'array',
            items: {
              type: 'string',
              format: 'uuid',
            },
          },
          required: false,
        },
        {
          in: 'query',
          name: 'take',
          schema: {
            type: 'integer',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'skip',
          schema: {
            type: 'integer',
          },
          required: false,
        },
      ],
      security: [{ BearerAuth: [] }],
      responses,
    },
    patch: {
      tags: ['User'],
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
          'multipart/form-data': {
            schema: {
              $ref: '#/schemas/updateUser',
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses,
    },
    delete: {
      tags: ['User'],
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
