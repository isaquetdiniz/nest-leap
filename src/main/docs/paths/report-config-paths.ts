import { responses } from '@/main/docs/helpers';

export const reportConfigPaths = {
  '/report-config': {
    post: {
      tags: ['Report Config'],
      summary: 'Create a new report config',
      produces: ['application/json'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/reportConfig',
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses,
    },
  },
  '/report-config/{id}': {
    get: {
      tags: ['Report Config'],
      summary: 'Get a Report Config by id, or Reports Configs',
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
          name: 'ownerId',
          schema: {
            type: 'string',
            format: 'uuid',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'status',
          schema: {
            type: 'string',
            enum: ['daily', 'weekly', 'monthly'],
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
          name: 'emails',
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
          name: 'periods',
          schema: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['daily', 'weekly', 'monthly'],
            },
          },
          required: false,
        },
        {
          in: 'query',
          name: 'dates',
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
      tags: ['Report Config'],
      summary: 'Update a Report Config by id',
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
              $ref: '#/schemas/updateReportConfig',
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses,
    },
    delete: {
      tags: ['Report Config'],
      summary: 'Delete a Report Config by id',
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
