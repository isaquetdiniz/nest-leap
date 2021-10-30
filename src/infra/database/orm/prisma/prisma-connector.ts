import { PrismaClient } from '@prisma/client';
import prismaEnviroment from './prisma-enviroment';

class PrismaConnector {
  private readonly url: string = `postgresql://${prismaEnviroment.databaseUsername}:${prismaEnviroment.databaseUserPassword}@${prismaEnviroment.databaseHost}:${prismaEnviroment.databasePort}/${prismaEnviroment.databaseName}?schema=public`;
  client: null | PrismaClient = null;

  connect(): PrismaClient {
    if (this.client !== null) {
      return this.client;
    }

    this.client = new PrismaClient({
      datasources: {
        db: {
          url: this.url,
        },
      },
    });

    return this.client;
  }
}

const prismaConnector = new PrismaConnector();

export { prismaConnector };
