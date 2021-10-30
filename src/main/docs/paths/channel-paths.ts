import { responses } from '@/main/docs/helpers';

export const channelPaths = {
  '/channel': {
    post: {
      tags: ['Channel'],
      summary: 'Create a new Channel',
      produces: ['application/json'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/channel',
            },
            example: {
              name: 'Whatsapp',
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses,
    },
  },
  '/channel/{id}': {
    get: {
      tags: ['Channel'],
      summary: 'Get a Channel by id, or Channels',
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
      tags: ['Channel'],
      summary: 'Update a Channel by id',
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
              $ref: '#/schemas/channel',
            },
            example: {
              name: 'Telefone',
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses,
    },
    delete: {
      tags: ['Channel'],
      summary: 'Delete a Channel',
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
