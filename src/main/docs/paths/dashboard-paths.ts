import {
  dashboardCardsResponses,
  dashboardGraphCallsResponses,
} from '@/main/docs/responses';
import { responses } from '@/main/docs/helpers';
const parameters = [
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
    name: 'ownerId',
    schema: {
      type: 'string',
      format: 'uuid',
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
];

export const dashboardPaths = {
  '/dashboard/graph-calls-amount': {
    get: {
      tags: ['Dashboard'],
      summary: 'Get graph calls amount',
      produces: ['application/json'],
      parameters,
      security: [{ BearerAuth: [] }],
      responses: dashboardGraphCallsResponses,
    },
  },
  '/dashboard/cards': {
    get: {
      tags: ['Dashboard'],
      summary: 'Get dashboard cards',
      produces: ['application/json'],
      parameters,
      security: [{ BearerAuth: [] }],
      responses: dashboardCardsResponses,
    },
  },
  '/dashboard/area-table': {
    get: {
      tags: ['Dashboard'],
      summary: 'Get dashboard area table',
      produces: ['application/json'],
      parameters,
      security: [{ BearerAuth: [] }],
      responses,
    },
  },
  '/dashboard/call-motive': {
    get: {
      tags: ['Dashboard'],
      summary: 'Get dashboard call motive table',
      produces: ['application/json'],
      parameters,
      security: [{ BearerAuth: [] }],
      responses,
    },
  },
  '/dashboard/table-operator': {
    get: {
      tags: ['Dashboard'],
      summary: 'Get dashboard operator table',
      produces: ['application/json'],
      parameters,
      security: [{ BearerAuth: [] }],
      responses,
    },
  },
  '/dashboard/graph-calls-regions': {
    get: {
      tags: ['Dashboard'],
      summary: 'Get dashboard graph calls regions',
      produces: ['application/json'],
      parameters,
      security: [{ BearerAuth: [] }],
      responses,
    },
  },
  '/dashboard/graph-operator': {
    get: {
      tags: ['Dashboard'],
      summary: 'Get dashboard graph operator',
      produces: ['application/json'],
      parameters,
      security: [{ BearerAuth: [] }],
      responses,
    },
  },
  '/dashboard/graph-attendance': {
    get: {
      tags: ['Dashboard'],
      summary: 'Get dashboard graph attendance',
      produces: ['application/json'],
      parameters,
      security: [{ BearerAuth: [] }],
      responses,
    },
  },
  '/dashboard/graph-open-calls': {
    get: {
      tags: ['Dashboard'],
      summary: 'Get dashboard graph open calls',
      produces: ['application/json'],
      parameters,
      security: [{ BearerAuth: [] }],
      responses,
    },
  },
  '/dashboard/map': {
    get: {
      tags: ['Dashboard'],
      summary: 'Get dashboard map',
      produces: ['application/json'],
      parameters,
      security: [{ BearerAuth: [] }],
      responses,
    },
  },
  '/dashboard/export-pdf': {
    post: {
      tags: ['Dashboard'],
      summary: 'Get a pdf of dashboard',
      produces: ['application/json'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  required: true,
                },
              },
            },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses,
    },
  },
};
