import { IUpdateTesteRatinhoRepository } from '@/domains/teste-ratinho';
import { prismaConnector } from '@/shared/infra/prisma';
import { PrismaClient } from '@prisma/client';

export class PrismaUpdateTesteRatinhoRepository
  implements IUpdateTesteRatinhoRepository
{
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async update(
    testeRatinhoToUpdate: IUpdateTesteRatinhoRepository.Params
  ): Promise<IUpdateTesteRatinhoRepository.Result> {
    const { id, ...restOfTesteRatinhoInJSON } = testeRatinhoToUpdate;

    const testeRatinhoUpdated = await this.prismaConnection.testeRatinho.update(
      {
        where: { id },
        data: restOfTesteRatinhoInJSON,
      }
    );

    return testeRatinhoUpdated;
  }
}
