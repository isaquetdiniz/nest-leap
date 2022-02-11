import { IDeleteTesteRatinhoByIdRepository } from '@/domains/teste-ratinho';
import { prismaConnector } from '@/shared/infra/prisma';
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
    await this.prismaConnection.testeRatinho.delete({
      where: { id },
    });
  }
}
