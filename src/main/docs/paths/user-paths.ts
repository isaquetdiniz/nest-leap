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
