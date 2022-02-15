import { IGetUserByEmailRepository } from '@/domains/user';
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
      const [user] = await this.prismaConnection.user.findMany({
        where: { email: email },
      });

      return user;
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}