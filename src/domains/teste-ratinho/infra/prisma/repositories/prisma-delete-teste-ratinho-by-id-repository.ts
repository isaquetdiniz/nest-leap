import { IDeleteTesteRatinhoByIdRepository } from '@/domains/teste-ratinho';
import { prismaConnector, PrismaException } from '@/shared/infra/prisma';
import { PrismaClient } from '@prisma/client';

export class PrismaDeleteTesteRatinhoByIdRepository
  implements IDeleteTesteRatinhoByIdRepository
{
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async delete(
    id: IDeleteTesteRatinhoByIdRepository.Params
  ): Promise<IDeleteTesteRatinhoByIdRepository.Result> {
    try {
      await this.prismaConnection.testeRatinho.delete({
        where: { id },
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
