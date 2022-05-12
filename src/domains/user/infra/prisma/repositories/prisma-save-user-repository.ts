import { ISaveUserRepository } from '@/domains/user';
import { User } from '@/domains/user/entities/user';
import { prismaConnector, PrismaException } from '@/shared/infra/prisma';
import { PrismaClient } from '@prisma/client';

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

      const user = new User(userCreated);

      return user;
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
