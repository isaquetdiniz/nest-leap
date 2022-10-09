import { User as UserModel, PrismaClient } from '@prisma/client';

import { IGetUserByIdRepository } from '@/domains/user/usecases/repos';
import { User } from '@/domains/user/entities';

import { convertNullToUndefined } from '@/shared/helpers';
import { prismaConnector, PrismaException } from '@/shared/infra/prisma';

export class PrismaGetUserByIdRepository implements IGetUserByIdRepository {
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async getById(
    id: IGetUserByIdRepository.Params
  ): Promise<IGetUserByIdRepository.Result> {
    try {
      const userFound = await this.prismaConnection.user.findUnique({
        where: { id },
      });

      if (!userFound) {
        return null;
      }

      const user = new User(convertNullToUndefined<UserModel>(userFound));

      return user;
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
