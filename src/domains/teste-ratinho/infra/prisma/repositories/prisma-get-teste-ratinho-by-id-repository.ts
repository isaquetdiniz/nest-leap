import { IGetTesteRatinhoByIdRepository } from '@/domains/teste-ratinho';
import { PrismaClient } from '@prisma/client';
import { prismaConnector, PrismaException } from '@/shared/infra/prisma';

export class PrismaGetTesteRatinhoByIdRepository
  implements IGetTesteRatinhoByIdRepository
{
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async get(
    id: IGetTesteRatinhoByIdRepository.Params
  ): Promise<IGetTesteRatinhoByIdRepository.Result> {
    try {
      const testeRatinho = await this.prismaConnection.testeRatinho.findUnique({
        where: { id },
      });

      return testeRatinho;
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
