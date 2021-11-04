import 'module-alias/register';

import env from '@/main/config/env';

import { prismaConnector } from '@/infra/database/orm/prisma';
import { SentryLoggerErrorAdapter } from '@/infra/sentry';

import httpServer from '@/main/config/http-server';

(async () => {
  SentryLoggerErrorAdapter.setup();

  prismaConnector.connect();
  console.log(`Prisma connect with success to ${env.databaseUrl}`);

  httpServer.listen(env.port, () =>
    console.log(`Server runing at http://localhost:${env.port}`)
  );
})();
