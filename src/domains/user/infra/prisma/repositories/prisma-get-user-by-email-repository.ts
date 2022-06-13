import { IGetUserByEmailRepository } from '@/domains/user/usecases/repos';
import { User } from '@/domains/user/entities';
import { PrismaClient } from '@prisma/client';
import { prismaConnector, PrismaException } from '@/shared/infra/prisma';

export class PrismaGetUserByEmailRepository
  implements IGetUserByEmailRepository
{
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async getByEmail(
    email: IGetUserByEmailRepository.Params
  ): Promise<IGetUserByEmailRepository.Result> {
    try {
      const [userFound] = await this.prismaConnection.user.findMany({
        where: { email: email },
      });

      if (!userFound) {
        return null;
      }

      const user = new User(userFound);

      return user;
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
