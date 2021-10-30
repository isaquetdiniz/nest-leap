import { responses } from '@/main/docs/helpers';

export const documentPaths = {
  '/document': {
    post: {
      tags: ['Document'],
      summary: 'Create a new Document',
      produces: ['application/json'],
      requestBody: {
        content: {
          'multipart/form-data': {
            schema: {
              $ref: '#/schemas/document',
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses,
    },
  },
  '/document/{id}': {
    get: {
      tags: ['Document'],
      summary: 'Get a Document by id, or Documents',
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
          name: 'typesIds',
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
          name: 'path',
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
    patch: {
      tags: ['Document'],
      summary: 'Update a Document by id',
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
              $ref: '#/schemas/updateDocument',
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses,
    },
    delete: {
      tags: ['Document'],
      summary: 'Delete a Document',
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
