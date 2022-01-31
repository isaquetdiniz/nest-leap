import { IGetUserByIdRepository } from '@/domains/user';
import { PrismaClient } from '.prisma/client';
import { prismaConnector } from '@/shared/infra/prisma';

export class PrismaGetUserByIdRepository implements IGetUserByIdRepository {
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async getById(
    id: IGetUserByIdRepository.Params
  ): Promise<IGetUserByIdRepository.Result> {
    const user = await this.prismaConnection.user.findUnique({
      where: { id },
    });

    return user;
  }
}
