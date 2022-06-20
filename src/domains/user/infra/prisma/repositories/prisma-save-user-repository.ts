import { User as UserModel, PrismaClient } from '@prisma/client';

import { ISaveUserRepository } from '@/domains/user/usecases/repos';
import { User } from '@/domains/user/entities';

import { convertNullToUndefined } from '@/shared/helpers';
import { prismaConnector, PrismaException } from '@/shared/infra/prisma';

export class PrismaSaveUserRepository implements ISaveUserRepository {
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async save(
    userParams: ISaveUserRepository.Params
  ): Promise<ISaveUserRepository.Result> {
    try {
      const userCreated = await this.prismaConnection.user.create({
        data: userParams,
      });

      const user = new User(convertNullToUndefined<UserModel>(userCreated));

      return user;
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
