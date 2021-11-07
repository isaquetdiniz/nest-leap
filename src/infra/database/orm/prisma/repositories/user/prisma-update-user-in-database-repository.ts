import { UpdateUserInDatabaseRepositoryError } from '@/application/errors/repositories/user';
import { UpdateUserInDatabaseRepository } from '@/application/protocols/database/repositories/user';
import { prismaConnector } from '@/infra/database/orm/prisma';
import { PrismaClient } from '@prisma/client';

export class PrismaUpdateUserInDatabaseRepository
  implements UpdateUserInDatabaseRepository
{
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async updateUser(
    userToUpdate: UpdateUserInDatabaseRepository.Params
  ): Promise<UpdateUserInDatabaseRepository.Result> {
    try {
      const { id, ...restOfUserInJSON } = userToUpdate.toJSON();

      await this.prismaConnection.user.update({
        where: { id },
        data: restOfUserInJSON,
      });
    } catch (error) {
      const errorCatched = error as Error;

      const { message } = errorCatched;

      throw new UpdateUserInDatabaseRepositoryError(message);
    }
  }
}
