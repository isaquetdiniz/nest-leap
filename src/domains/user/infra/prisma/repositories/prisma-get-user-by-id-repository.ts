import { IGetUserByIdRepository } from '@/domains/user';
import { PrismaClient } from '@prisma/client';
import { prismaConnector, PrismaException } from '@/shared/infra/prisma';
import { User } from '@/domains/user/entities/user';

export class PrismaGetUserByIdRepository implements IGetUserByIdRepository {
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async getById(
    id: IGetUserByIdRepository.Params
  ): Promise<IGetUserByIdRepository.Result> {
    try {
      let user = null;

      const userCreated = await this.prismaConnection.user.findUnique({
        where: { id },
      });

      if (userCreated) {
        user = new User(userCreated);
      }

      return user;
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
