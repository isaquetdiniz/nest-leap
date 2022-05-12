import { IGetUsersByFilterRepository } from '@/domains/user';
import { PrismaClient } from '@prisma/client';
import { prismaConnector, PrismaException } from '@/shared/infra/prisma';
import { PrismaFormatter } from '@/shared/infra/prisma/prisma-formatter';
import { User } from '@/domains/user/entities/user';

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

      const usersFound = await this.prismaConnection.user.findMany({
        where: filtersFormated,
        orderBy: { [orderBy.property]: orderBy.mode },
        take: pagination.take,
        skip: pagination.skip,
      });

      const users = usersFound.map((userFound) => {
        return new User(userFound);
      });

      return users;
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
