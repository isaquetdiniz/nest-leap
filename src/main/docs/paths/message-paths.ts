import { responses } from '@/main/docs/helpers';

export const messagePaths = {
  '/message': {
    post: {
      tags: ['Message'],
      summary: 'Create a new Message',
      produces: ['application/json'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/message',
            },
          },
          'multipart/form-data': {
            schema: {
              $ref: '#/schemas/messageFile',
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses,
    },
  },
  '/message/{id}': {
    get: {
      tags: ['Message'],
      summary: 'Get a Message by id, or Messages',
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
          name: 'types',
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
          name: 'sendersRoles',
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
          name: 'senderId',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'requesterId',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'callId',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'content',
          schema: {
            type: 'string',
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
  },
};
