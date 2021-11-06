import { PrismaClient } from '.prisma/client';
import {
  CountUsersInDatabaseRepositoryError,
  ListUsersInDatabaseRepositoryError,
} from '@/application/errors/repositories/user';
import {
  CountUsersInDatabaseRepository,
  ListUsersInDatabaseRepository,
} from '@/application/protocols/database/repositories/user';
import { prismaConnector } from '@/infra/database/orm/prisma';
import { PrismaFormatter } from '@/infra/database/orm/prisma/repositories/prisma-formatter';

export class PrismaListUsersInDatabaseRepository
  implements ListUsersInDatabaseRepository, CountUsersInDatabaseRepository
{
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async countUsers(
    userFilter: CountUsersInDatabaseRepository.Params
  ): Promise<CountUsersInDatabaseRepository.Result> {
    try {
      const userfilterObject = PrismaFormatter.formatFilter(userFilter);

      const totalUsers = await this.prismaConnection.user.count({
        where: userfilterObject,
      });

      return { totalUsers };
    } catch (error) {
      const errorCatched = error as Error;

      const { message } = errorCatched;

      throw new CountUsersInDatabaseRepositoryError(message);
    }
  }

  async listUser(
    userFilter: ListUsersInDatabaseRepository.Params
  ): Promise<ListUsersInDatabaseRepository.Result> {
    try {
      const { take, skip, orderBy, ...restOfUserFilters } = userFilter;

      const userFilterObject = PrismaFormatter.formatFilter(restOfUserFilters);
      const userFindOptions = PrismaFormatter.formatFindOptions({
        take,
        skip,
        orderBy,
      });

      // @ts-ignore
      const users = await this.prismaConnection.user.findMany({
        where: userFilterObject,
        ...userFindOptions,
      });

      const { totalUsers } = await this.countUsers(restOfUserFilters);

      return { users, totalUsers };
    } catch (error) {
      const errorCatched = error as Error;

      const { message } = errorCatched;

      throw new ListUsersInDatabaseRepositoryError(message);
    }
  }
}
