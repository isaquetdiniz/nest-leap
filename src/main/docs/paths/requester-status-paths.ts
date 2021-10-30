import { responses } from '@/main/docs/helpers';

export const requesterStatusPaths = {
  '/requester-status': {
    post: {
      tags: ['Requester Status'],
      summary: 'Create a new Requester Status',
      produces: ['application/json'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/requesterStatus',
            },
            example: {
              name: 'Técnica',
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses,
    },
  },
  '/requester-status/{id}': {
    get: {
      tags: ['Requester Status'],
      summary: 'Get a Requester Status by id, or Requester Statuss',
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
      tags: ['Requester Status'],
      summary: 'Update a Requester Status by id',
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
              $ref: '#/schemas/requesterStatus',
            },
            example: {
              name: 'Bot',
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses,
    },
    delete: {
      tags: ['Requester Status'],
      summary: 'Delete a Requester Status',
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
