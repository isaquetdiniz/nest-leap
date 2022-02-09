import {
  responses,
  SwaggerContents,
  SwaggerTypes,
} from '@/shared/infra/swagger/helpers';

export const authTag = 'Auth';

export const authPaths = {
  '/auth/first-access': {
    post: {
      tags: [authTag],
      summary: 'First login',
      produces: ['application/json'],
      requestBody: {
        content: SwaggerContents.applicationJson(
          [
            ['email', SwaggerTypes.email(true)],
            ['newPassword', SwaggerTypes.password(true)],
            ['temporaryPassword', SwaggerTypes.password(true)],
          ],
          [
            ['email', 'any_email@mail.com'],
            ['newPassword', 'senhaforte'],
            ['temporaryPassword', 'topdemais'],
          ]
        ),
      },
      responses,
    },
  },
  '/auth/login': {
    post: {
      tags: [authTag],
      summary: 'Login',
      produces: ['application/json'],
      requestBody: {
        content: SwaggerContents.applicationJson(
          [
            ['email', SwaggerTypes.email(true)],
            ['password', SwaggerTypes.password(true)],
          ],
          [
            ['email', 'any_email@mail.com'],
            ['password', 'senhaforte'],
          ]
        ),
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
        content: SwaggerContents.applicationJson(
          [['email', SwaggerTypes.email(true)]],
          [['email', 'any_email@mail.com']]
        ),
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
        content: SwaggerContents.applicationJson(
          [
            ['email', SwaggerTypes.email(true)],
            ['newPassword', SwaggerTypes.password(true)],
            ['verificationCode', SwaggerTypes.password(true)],
          ],
          [
            ['email', 'any_email@mail.com'],
            ['newPassword', 'senhaforte'],
            ['verificationCode', '40028922'],
          ]
        ),
      },
      responses,
    },
  },
  '/auth/refresh-token': {
    post: {
      tags: ['Auth'],
      summary: 'Get a refresh token',
      produces: ['application/json'],
      requestBody: {
        content: SwaggerContents.applicationJson(
          [['refreshToken', SwaggerTypes.email(true)]],
          [['refreshToken', 'jwttoken']]
        ),
      },
      responses,
    },
  },
};
