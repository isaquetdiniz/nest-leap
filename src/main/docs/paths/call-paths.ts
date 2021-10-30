import { responses } from '@/main/docs/helpers';

export const callPaths = {
  '/call': {
    post: {
      tags: ['Call'],
      summary: 'Create a new Call',
      produces: ['application/json'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/call',
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses,
    },
  },
  '/call/{id}': {
    get: {
      tags: ['Call'],
      summary: 'Get a Call by id, or Calls',
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
          in: 'path',
          name: 'protocolNumber',
          schema: {
            type: 'string',
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
          name: 'motivesIds',
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
          name: 'channelsIds',
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
          name: 'status',
          schema: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['hold', 'opened', 'canceled', 'concluded'],
            },
          },
          required: false,
        },
        {
          in: 'query',
          name: 'ownersIds',
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
          name: 'requestersIds',
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
          name: 'confidential',
          schema: {
            type: 'boolean',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'isFromBot',
          schema: {
            type: 'boolean',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'usersIds',
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
        {
          in: 'query',
          name: 'exportCsv',
          schema: {
            type: 'boolean',
          },
          required: false,
        },
      ],
      security: [{ BearerAuth: [] }],
      responses,
    },
    patch: {
      tags: ['Call'],
      summary: 'Update a Call by id',
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
              $ref: '#/schemas/updateCall',
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses,
    },
    delete: {
      tags: ['Call'],
      summary: 'Delete a Call',
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
