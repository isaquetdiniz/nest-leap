import { responses } from '@/main/docs/helpers';

export const authPaths = {
  '/login': {
    post: {
      tags: ['Auth'],
      summary: 'Login',
      produces: ['application/json'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/login',
            },
            example: {
              email: 'any_email@mail.com',
              password: 'batatao',
            },
          },
        },
      },
      responses,
    },
  },
  '/refresh-token': {
    post: {
      tags: ['Auth'],
      summary: 'Get a refresh token',
      produces: ['application/json'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                  required: true,
                },
              },
            },
            example: {
              token: 'jwttoken',
            },
          },
        },
      },
      responses,
    },
  },
};
