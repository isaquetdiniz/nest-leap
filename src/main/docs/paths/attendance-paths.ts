import { responses } from '@/main/docs/helpers';

export const attendancePaths = {
  '/attendance': {
    post: {
      tags: ['Attendance'],
      summary: 'Create a new Attendance',
      produces: ['application/json'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/attendance',
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses,
    },
  },
  '/attendance/{id}': {
    get: {
      tags: ['Attendance'],
      summary: 'Get a Attendance by id, or Attendances',
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
          name: 'isOnline',
          schema: {
            type: 'boolean',
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
          name: 'requesterId',
          schema: {
            type: 'string',
            format: 'uuid',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'userId',
          schema: {
            type: 'string',
            format: 'uuid',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'rangeStartDate',
          schema: {
            type: 'array',
            items: {
              type: 'string',
              format: 'date-time',
            },
            minItems: 2,
            maxItems: 2,
          },
          required: false,
        },
        {
          in: 'query',
          name: 'rangeEndDate',
          schema: {
            type: 'array',
            items: {
              type: 'string',
              format: 'date-time',
            },
            minItems: 2,
            maxItems: 2,
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
      tags: ['Attendance'],
      summary: 'Update a Attendance by id',
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
              $ref: '#/schemas/updateAttendance',
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses,
    },
    delete: {
      tags: ['Attendance'],
      summary: 'Delete a Attendance by id',
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
