import { ISaveUserRepository } from '@/domains/user';
import { prismaConnector } from '@/infra/databases/prisma';
import { PrismaClient } from '@prisma/client';

export class PrismaSaveUserRepository implements ISaveUserRepository {
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async save(
    userParams: ISaveUserRepository.Params
  ): Promise<ISaveUserRepository.Result> {
    const userCreated = await this.prismaConnection.user.create({
      data: userParams,
    });

    return userCreated;
  }
}
