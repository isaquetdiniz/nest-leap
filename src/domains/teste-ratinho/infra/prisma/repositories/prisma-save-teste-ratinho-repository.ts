import { ISaveTesteRatinhoRepository } from '@/domains/teste-ratinho';
import { prismaConnector } from '@/shared/infra/prisma';
import { PrismaClient } from '@prisma/client';

export class PrismaSaveTesteRatinhoRepository
  implements ISaveTesteRatinhoRepository
{
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async save(
    testeRatinhoParams: ISaveTesteRatinhoRepository.Params
  ): Promise<ISaveTesteRatinhoRepository.Result> {
    const testeRatinhoCreated = await this.prismaConnection.testeRatinho.create(
      {
        data: testeRatinhoParams,
      }
    );

    return testeRatinhoCreated;
  }
}
