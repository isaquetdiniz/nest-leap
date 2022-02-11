import { ISaveTesteRatinhoRepository } from '@/domains/teste-ratinho';
import { prismaConnector, PrismaException } from '@/shared/infra/prisma';
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
    try {
      const testeRatinhoCreated =
        await this.prismaConnection.testeRatinho.create({
          data: testeRatinhoParams,
        });

      return testeRatinhoCreated;
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
