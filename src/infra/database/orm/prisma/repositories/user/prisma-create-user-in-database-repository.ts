import { CreateUserInDatabaseRepositoryError } from '@/application/errors/repositories/user';
import { CreateUserInDatabaseRepository } from '@/application/protocols/database/repositories/user';
import { prismaConnector } from '@/infra/database/orm/prisma';

export class PrismaCreateUserInDatabaseRepository
  implements CreateUserInDatabaseRepository
{
  async createUser(
    userParams: CreateUserInDatabaseRepository.Params
  ): Promise<CreateUserInDatabaseRepository.Result> {
    try {
      const user = userParams;
      const userParamsInJSON = user.toJSON();

      await prismaConnector.connect().user.create({
        data: userParamsInJSON,
      });
    } catch (error) {
      const errorCatched = error as Error;

      const { message } = errorCatched;

      throw new CreateUserInDatabaseRepositoryError(message);
    }
  }
}
