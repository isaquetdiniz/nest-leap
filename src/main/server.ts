import 'module-alias/register';

import env from '@/main/config/env';

import { prismaConnector } from '@/infra/database/orm/prisma';
import { SentryLoggerErrorAdapter } from '@/infra/sentry';

import httpServer from '@/main/config/http-server';
import { makePinoLoggerAdapter } from './factories/infra/pino';

(async () => {
  const logger = makePinoLoggerAdapter();

  SentryLoggerErrorAdapter.setup();

  prismaConnector.connect();
  logger.logInfo(`Prisma connect with success to ${env.databaseUrl}`);

  httpServer.listen(env.port, () =>
    logger.logInfo(`Server runing at http://localhost:${env.port}`)
  );
})();
