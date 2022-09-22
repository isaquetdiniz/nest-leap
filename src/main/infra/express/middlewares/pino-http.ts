import pino from 'pino-http';

import { env } from '@/main/config';

export const pinoHttp = pino({
  ...(env.application.mode === 'local'
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
      }
    : {}),
});
