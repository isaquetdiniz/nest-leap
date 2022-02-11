import { IGetTesteRatinhosByFilterRepository } from '@/domains/teste-ratinho';
import { PrismaClient } from '@prisma/client';
import { prismaConnector } from '@/shared/infra/prisma';
import { PrismaFormatter } from '@/shared/infra/prisma/prisma-formatter';

export class PrismaGetTesteRatinhosByFilterRepository
  implements IGetTesteRatinhosByFilterRepository
{
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async get(
    filter: IGetTesteRatinhosByFilterRepository.Params
  ): Promise<IGetTesteRatinhosByFilterRepository.Result> {
    const { orderBy, pagination, filters } = filter;

    const filtersFormated = PrismaFormatter.formatFilter(filters);

    const testeRatinhos = await this.prismaConnection.testeRatinho.findMany({
      where: filtersFormated,
      orderBy: { [orderBy.property]: orderBy.mode },
      take: pagination.take,
      skip: pagination.skip,
    });

    return testeRatinhos;
  }
}
