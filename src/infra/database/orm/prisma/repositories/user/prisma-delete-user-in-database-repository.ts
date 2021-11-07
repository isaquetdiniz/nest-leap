import { DeleteUserInDatabaseRepositoryError } from '@/application/errors/repositories/user';
import { DeleteUserInDatabaseRepository } from '@/application/protocols/database/repositories/user';
import { prismaConnector } from '@/infra/database/orm/prisma';
import { PrismaClient } from '@prisma/client';

export class PrismaDeleteUserInDatabaseRepository
  implements DeleteUserInDatabaseRepository
{
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async deleteUser(
    user: DeleteUserInDatabaseRepository.Params
  ): Promise<DeleteUserInDatabaseRepository.Result> {
    try {
      const userId = user.getId();

      await this.prismaConnection.user.delete({
        where: { id: userId },
      });
    } catch (error) {
      const errorCatched = error as Error;

      const { message } = errorCatched;

      throw new DeleteUserInDatabaseRepositoryError(message);
    }
  }
}
