import { IDeleteUserByIdRepository } from '@/domains/user';
import { prismaConnector, PrismaException } from '@/shared/infra/prisma';
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
    try {
      await this.prismaConnection.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
