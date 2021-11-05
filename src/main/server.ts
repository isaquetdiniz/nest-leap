import 'module-alias/register';

import env from '@/main/config/env';

import { prismaConnector } from '@/infra/database/orm/prisma';
import { SentryLoggerErrorCloudAdapter } from '@/infra/logs/sentry';

import httpServer from '@/main/config/http-server';
import { makePinoLoggerLocalAdapter } from './factories/infra/logs/pino';

(async () => {
  const loggerLocal = makePinoLoggerLocalAdapter();

  SentryLoggerErrorCloudAdapter.setup();

  prismaConnector.connect();
  loggerLocal.logInfo(`Prisma connect with success to ${env.databaseUrl}`);

  httpServer.listen(env.port, () =>
    loggerLocal.logInfo(`Server runing at http://localhost:${env.port}`)
  );
})();
