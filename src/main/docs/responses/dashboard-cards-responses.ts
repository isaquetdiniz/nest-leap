import { responses } from '@/main/docs/helpers';

export const dashboardCardsResponses = {
  ...responses,
  200: {
    description: 'OK',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
              },
              value: {
                type: 'number',
              },
              percentage: {
                type: 'number',
              },
              max: {
                type: 'number',
                required: false,
              },
              hasBeacon: {
                type: 'boolean',
                required: false,
              },
            },
          },
        },
      },
    },
  },
};
