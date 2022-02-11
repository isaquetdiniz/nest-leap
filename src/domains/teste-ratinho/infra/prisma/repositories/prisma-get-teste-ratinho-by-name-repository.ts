import { IGetTesteRatinhoByNameRepository } from '@/domains/teste-ratinho';
import { PrismaClient } from '@prisma/client';
import { prismaConnector } from '@/shared/infra/prisma';

export class PrismaGetTesteRatinhoByNameRepository
  implements IGetTesteRatinhoByNameRepository
{
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async get(
    name: IGetTesteRatinhoByNameRepository.Params
  ): Promise<IGetTesteRatinhoByNameRepository.Result> {
    const [testeRatinho] = await this.prismaConnection.testeRatinho.findMany({
      where: { name },
    });

    return testeRatinho;
  }
}
