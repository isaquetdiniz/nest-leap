import {
  SwaggerContents,
  SwaggerSchemas,
  SwaggerTypes,
  SwaggerResponse,
  defaultResponses,
} from '@/shared/infra/swagger/helpers';

export const authTag = 'Auth';

export const authUserSchema = SwaggerSchemas.create('AuthUser', [
  ['id', SwaggerTypes.uuid(true)],
  ['name', SwaggerTypes.string(true)],
  ['email', SwaggerTypes.email(true)],
  ['isAdmin', SwaggerTypes.boolean(true)],
]);

export const authPaths = {
  '/auth/first-access': {
    post: {
      tags: [authTag],
      summary: 'First login',
      produces: ['application/json'],
      requestBody: {
        content: SwaggerContents.applicationJson([
          ['email', SwaggerTypes.email(true)],
          ['newPassword', SwaggerTypes.password(true)],
          ['temporaryPassword', SwaggerTypes.password(true)],
        ]),
      },
      responses: {
        ...SwaggerResponse.ok(
          'Successfully Made First Login',
          SwaggerContents.applicationJson([
            [
              'accessToken',
              SwaggerTypes.string(true, 'eyJraWQiOiJoenp3SHBiMEdZZmJOTE9HN0J'),
            ],
            [
              'refreshToken',
              SwaggerTypes.string(true, 'eyJraWQiOiJoenp3SHBiMEdZZmJOTE9HN0J'),
            ],
            [
              'authUser',
              SwaggerTypes.object(true, [
                ['id', SwaggerTypes.uuid(true)],
                ['name', SwaggerTypes.string(true)],
                ['email', SwaggerTypes.email(true)],
                ['isAdmin', SwaggerTypes.boolean(true)],
              ]),
            ],
          ])
        ),
        ...defaultResponses,
      },
    },
  },
  '/auth/login': {
    post: {
      tags: [authTag],
      summary: 'Login',
      produces: ['application/json'],
      requestBody: {
        content: SwaggerContents.applicationJson([
          ['email', SwaggerTypes.email(true)],
          ['password', SwaggerTypes.password(true)],
        ]),
      },
      responses: {
        ...SwaggerResponse.ok(
          'Succesfully Logged',
          SwaggerContents.applicationJson([
            [
              'accessToken',
              SwaggerTypes.string(true, 'eyJraWQiOiJoenp3SHBiMEdZZmJOTE9HN0J'),
            ],
            [
              'refreshToken',
              SwaggerTypes.string(true, 'eyJraWQiOiJoenp3SHBiMEdZZmJOTE9HN0J'),
            ],
            [
              'authUser',
              SwaggerTypes.object(true, [
                ['id', SwaggerTypes.uuid(true)],
                ['name', SwaggerTypes.string(true)],
                ['email', SwaggerTypes.email(true)],
                ['isAdmin', SwaggerTypes.boolean(true)],
              ]),
            ],
          ])
        ),
        ...defaultResponses,
      },
    },
  },
  '/auth/forgot-password': {
    post: {
      tags: ['Auth'],
      summary: 'Forgot Password',
      produces: ['application/json'],
      requestBody: {
        content: SwaggerContents.applicationJson([
          ['email', SwaggerTypes.email(true)],
        ]),
      },
      responses: {
        ...SwaggerResponse.ok('Successfully forgot password'),
        ...defaultResponses,
      },
    },
  },
  '/auth/confirm-forgot-password': {
    post: {
      tags: ['Auth'],
      summary: 'Confirm Forgot Password',
      produces: ['application/json'],
      requestBody: {
        content: SwaggerContents.applicationJson([
          ['email', SwaggerTypes.email(true)],
          ['newPassword', SwaggerTypes.password(true)],
          ['verificationCode', SwaggerTypes.password(true)],
        ]),
      },
      responses: {
        ...SwaggerResponse.ok('Successfully confirm forgot password'),
        ...defaultResponses,
      },
    },
  },
  '/auth/refresh-token': {
    post: {
      tags: ['Auth'],
      summary: 'Get a refresh token',
      produces: ['application/json'],
      requestBody: {
        content: SwaggerContents.applicationJson([
          [
            'refreshToken',
            SwaggerTypes.string(true, 'eyJraWQiOiJoenp3SHBiMEdZZmJOTE9HN0J'),
          ],
        ]),
      },
      responses: {
        ...SwaggerResponse.ok(
          'Successfully refresh a token',
          SwaggerContents.applicationJson([
            [
              'accessToken',
              SwaggerTypes.string(true, 'eyJraWQiOiJoenp3SHBiMEdZZmJOTE9HN0J'),
            ],
          ])
        ),
        ...defaultResponses,
      },
    },
  },
};
