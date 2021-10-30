import { responses } from '@/main/docs/helpers';

export const requesterPaths = {
  '/requester': {
    post: {
      tags: ['Requester'],
      summary: 'Create a new Requester',
      produces: ['application/json'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/requester',
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses,
    },
  },
  '/requester/{id}': {
    get: {
      tags: ['Requester'],
      summary: 'Get a Requester by id, or Requesters',
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
          name: 'requesterStatusIds',
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
          name: 'regionsIds',
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
          name: 'name',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'sei',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'cpf',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'search',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'rg',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'email',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'phone',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'phoneWhatsapp',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'contactName',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'contactPhone',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'relativeName',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'relativeCpf',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'relativeRg',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'relativePhone',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'relativeAddress',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'stamp',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'batch',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'sector',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'address',
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
      tags: ['Requester'],
      summary: 'Update a Requester by id',
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
              $ref: '#/schemas/updateRequester',
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses,
    },
    delete: {
      tags: ['Requester'],
      summary: 'Delete a Requester by id',
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
