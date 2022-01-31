import { IDeleteUserByIdRepository } from '@/domains/user';
import { prismaConnector } from '@/infra/databases/prisma';
import { PrismaClient } from '@prisma/client';

export class PrismaDeleteUserByIdRepository
  implements IDeleteUserByIdRepository
{
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async delete(
    id: IDeleteUserByIdRepository.Params
  ): Promise<IDeleteUserByIdRepository.Result> {
    await this.prismaConnection.user.delete({
      where: { id },
    });
  }
}
