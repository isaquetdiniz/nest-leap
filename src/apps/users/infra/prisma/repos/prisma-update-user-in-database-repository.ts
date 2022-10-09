import { User as UserModel, PrismaClient } from '@prisma/client';

import { IUpdateUserRepository } from '@/domains/user/usecases/repos';
import { User } from '@/domains/user/entities';

import { prismaConnector, PrismaException } from '@/shared/infra/prisma';
import { convertNullToUndefined } from '@/shared/helpers';

export class PrismaUpdateUserRepository implements IUpdateUserRepository {
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async update(
    userToUpdate: IUpdateUserRepository.Params
  ): Promise<IUpdateUserRepository.Result> {
    try {
      const { id, ...restOfUserInJSON } = userToUpdate;

      const userUpdated = await this.prismaConnection.user.update({
        where: { id },
        data: restOfUserInJSON,
      });

      const user = new User(convertNullToUndefined<UserModel>(userUpdated));

      return user;
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
