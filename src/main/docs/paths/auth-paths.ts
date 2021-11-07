import { responses } from '@/main/docs/helpers';

export const authPaths = {
  '/auth/first-login': {
    post: {
      tags: ['Auth'],
      summary: 'First login',
      produces: ['application/json'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/firstLoginSchema',
            },
            example: {
              email: 'any_email@mail.com',
              newPassword: 'batatao',
              temporaryPassword: 'topdemais',
            },
          },
        },
      },
      responses,
    },
  },
  '/auth/login': {
    post: {
      tags: ['Auth'],
      summary: 'Login',
      produces: ['application/json'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/loginSchema',
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
  '/auth/forgot-password': {
    post: {
      tags: ['Auth'],
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
                  required: true,
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
  '/auth/confirm-forgot-password': {
    post: {
      tags: ['Auth'],
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
                  required: true,
                },
                newPassword: {
                  type: 'string',
                  required: true,
                },
                verificationCode: {
                  type: 'string',
                  required: true,
                },
              },
            },
            example: {
              email: 'any_email@mail.com',
              newPassword: 'blablabla',
              verificationCode: 1020,
            },
          },
        },
      },
      responses,
    },
  },
  'auth/refresh-token': {
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
