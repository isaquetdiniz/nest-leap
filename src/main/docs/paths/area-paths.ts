import { responses } from '@/main/docs/helpers';

export const areaPaths = {
  '/area': {
    post: {
      tags: ['Area'],
      summary: 'Create a new Area',
      produces: ['application/json'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/area',
            },
            example: {
              name: 'Rio Branco',
              type: 'area',
              regionId: 'd2c5e9f6-2a73-4d1d-8649-86935556c24d',
              lat: '-10.0821',
              lng: '-15.1291',
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses,
    },
  },
  '/area/{id}': {
    get: {
      tags: ['Area'],
      summary: 'Get a Area by filter, or Areas',
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
          name: 'name',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'type',
          schema: {
            type: 'string',
            enum: ['area', 'enterprise'],
          },
          required: false,
        },
        {
          in: 'query',
          name: 'enabled',
          schema: {
            type: 'boolean',
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
          name: 'lat',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'lng',
          schema: {
            type: 'string',
            format: 'uuid',
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
        {
          in: 'query',
          name: 'numberOfBlocks',
          schema: {
            type: 'integer',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'numberOfApartments',
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
      tags: ['Area'],
      summary: 'Update a Area by id',
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
              $ref: '#/schemas/updateArea',
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses,
    },
    delete: {
      tags: ['Area'],
      summary: 'Delete a Area',
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
