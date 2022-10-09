import { User as UserModel, PrismaClient } from '@prisma/client';

import { IGetUsersByFilterRepository } from '@/domains/user/usecases/repos';
import { User } from '@/domains/user/entities';

import { convertNullToUndefined } from '@/shared/helpers';
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

      const usersFound = await this.prismaConnection.user.findMany({
        where: filtersFormated,
        orderBy: { [orderBy.property]: orderBy.mode },
        take: pagination.take,
        skip: pagination.skip,
      });

      const users = usersFound.map((userFound) => {
        return new User(convertNullToUndefined<UserModel>(userFound));
      });

      return users;
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
