import { PrismaClient } from '@prisma/client';
import { CreateUserInDatabaseRepositoryError } from '@/application/errors/repositories/user';
import { CreateUserInDatabaseRepository } from '@/application/protocols/database/repositories/user';

export class PrismaCreateUserInDatabaseRepository
  implements CreateUserInDatabaseRepository
{
  private readonly prismaConnection: PrismaClient;

  constructor(prismaConnection: PrismaClient) {
    this.prismaConnection = prismaConnection;
  }

  async createUser(
    userParams: CreateUserInDatabaseRepository.Params
  ): Promise<CreateUserInDatabaseRepository.Result> {
    try {
      const user = userParams;
      const userParamsInJSON = user.toJSON();

      await this.prismaConnection.user.create({
        data: userParamsInJSON,
      });
    } catch (error) {
      // @ts-ignore
      const { message } = error;

      throw new CreateUserInDatabaseRepositoryError(message);
    }
  }
}
