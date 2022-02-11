import { IGetTesteRatinhosByFilterRepository } from '@/domains/teste-ratinho';
import { PrismaClient } from '@prisma/client';
import {
  prismaConnector,
  PrismaFormatter,
  PrismaException,
} from '@/shared/infra/prisma';

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
    try {
      const { orderBy, pagination, filters } = filter;

      const filtersFormated = PrismaFormatter.formatFilter(filters);

      const testeRatinhos = await this.prismaConnection.testeRatinho.findMany({
        where: filtersFormated,
        orderBy: { [orderBy.property]: orderBy.mode },
        take: pagination.take,
        skip: pagination.skip,
      });

      return testeRatinhos;
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
