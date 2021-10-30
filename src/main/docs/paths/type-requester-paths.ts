import { responses } from '@/main/docs/helpers';

export const typeRequesterPaths = {
  '/type-requester': {
    post: {
      tags: ['Type Requester'],
      summary: 'Create a new Type Requester',
      produces: ['application/json'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/typeRequester',
            },
            example: {
              name: 'Toperson',
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses,
    },
  },
  '/type-requester/{id}': {
    get: {
      tags: ['Type Requester'],
      summary: 'Get a Type Requester by id, or Type Requesters',
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
      tags: ['Type Requester'],
      summary: 'Update a Type Requester by id',
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
              $ref: '#/schemas/typeRequester',
            },
            example: {
              name: 'Síndico do Prédio',
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses,
    },
    delete: {
      tags: ['Type Requester'],
      summary: 'Delete a Type Requester',
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
