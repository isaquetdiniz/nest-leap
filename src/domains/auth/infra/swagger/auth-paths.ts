import { responses } from '@/shared/infra/swagger/helpers';

export const authTag = 'Auth';

export const authPaths = {
  '/auth/first_login': {
    post: {
      tags: [authTag],
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
  '/auth/forgot_password': {
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
  '/auth/confirm_forgot_password': {
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
  '/auth/refresh_token': {
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
                refreshToken: {
                  type: 'string',
                  required: true,
                },
              },
            },
            example: {
              refreshToken: 'jwttoken',
            },
          },
        },
      },
      responses,
    },
  },
};
