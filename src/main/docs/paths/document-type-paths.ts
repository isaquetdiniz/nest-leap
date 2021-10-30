import { responses } from '@/main/docs/helpers';

export const documentTypePaths = {
  '/document-type': {
    post: {
      tags: ['Document Type'],
      summary: 'Create a new Document Type',
      produces: ['application/json'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/documentType',
            },
            example: {
              name: 'RG',
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses,
    },
  },
  '/document-type/{id}': {
    get: {
      tags: ['Document Type'],
      summary: 'Get a Document Type by id, or Documents Types',
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
      tags: ['Document Type'],
      summary: 'Update a Document Type by id',
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
              $ref: '#/schemas/documentType',
            },
            example: {
              name: 'CPF',
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses,
    },
    delete: {
      tags: ['Document Type'],
      summary: 'Delete a Document Type',
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
