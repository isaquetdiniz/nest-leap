import { ICountUsersByFilterRepository } from '@/domains/user';
import { prismaConnector, PrismaFormatter } from '@/shared/infra/prisma';
import { PrismaClient } from '@prisma/client';

export class PrismaCountUsersByFilterRepository
  implements ICountUsersByFilterRepository
{
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async count(
    filter: ICountUsersByFilterRepository.Params
  ): Promise<ICountUsersByFilterRepository.Result> {
    const filterParams = PrismaFormatter.formatFilter(filter);
    const totalUsers = await this.prismaConnection.user.count({
      where: filterParams,
    });

    return totalUsers;
  }
}
