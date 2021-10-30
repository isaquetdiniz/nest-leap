import { responses } from '@/main/docs/helpers';

export const dashboardGraphCallsResponses = {
  ...responses,
  200: {
    description: 'OK',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            amountCallsPerMonth: {
              type: 'array',
              items: {
                type: 'number',
              },
            },
            amountCallsPerDay: {
              type: 'array',
              items: {
                type: 'number',
              },
            },
            amountCallsPerHour: {
              type: 'array',
              items: {
                type: 'number',
              },
            },
            monthLabels: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            dayLabels: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            hourLabels: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
};
