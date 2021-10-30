import 'module-alias/register';

import env from '@/main/config/env';

import { prismaConnector } from '@/infra/database/orm/prisma';

import httpServer from '@/main/config/http-server';

(async () => {
  prismaConnector.connect();
  console.log(`Prisma connect with success to ${env.databaseUrl}`);

  httpServer.listen(env.port, () =>
    console.log(`Server runing at http://localhost:${env.port}`)
  );
})();
