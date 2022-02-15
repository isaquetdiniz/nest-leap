import { IGetUsersByFilterRepository } from '@/domains/user';
import { PrismaClient } from '@prisma/client';
import { prismaConnector, PrismaException } from '@/shared/infra/prisma';
import { PrismaFormatter } from '@/shared/infra/prisma/prisma-formatter';

export class PrismaGetUsersByFilterRepository
  implements IGetUsersByFilterRepository
{
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async get(
    filter: IGetUsersByFilterRepository.Params
  ): Promise<IGetUsersByFilterRepository.Result> {
    try {
      const { orderBy, pagination, filters } = filter;

      const filtersFormated = PrismaFormatter.formatFilter(filters);

      const users = await this.prismaConnection.user.findMany({
        where: filtersFormated,
        orderBy: { [orderBy.property]: orderBy.mode },
        take: pagination.take,
        skip: pagination.skip,
      });

      return users;
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
