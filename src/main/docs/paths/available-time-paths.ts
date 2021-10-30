import { responses } from '@/main/docs/helpers';

export const availableTimePaths = {
  '/available-time': {
    get: {
      tags: ['Available Time'],
      summary: 'Get Available Times',
      produces: ['application/json'],
      parameters: [
        {
          in: 'query',
          name: 'userId',
          schema: {
            type: 'string',
            format: 'uuid',
          },
          required: true,
        },
        {
          in: 'query',
          name: 'isOnline',
          schema: {
            type: 'boolean',
          },
        },
      ],
      security: [{ BearerAuth: [] }],
      responses,
    },
  },
};
