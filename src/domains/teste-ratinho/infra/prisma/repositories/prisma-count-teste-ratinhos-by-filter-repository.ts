import { ICountTesteRatinhosByFilterRepository } from '@/domains/teste-ratinho';
import {
  prismaConnector,
  PrismaFormatter,
  PrismaException,
} from '@/shared/infra/prisma';
import { PrismaClient } from '@prisma/client';

export class PrismaCountTesteRatinhosByFilterRepository
  implements ICountTesteRatinhosByFilterRepository
{
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async count(
    filter: ICountTesteRatinhosByFilterRepository.Params
  ): Promise<ICountTesteRatinhosByFilterRepository.Result> {
    try {
      const filterParams = PrismaFormatter.formatFilter(filter);
      const totalTesteRatinhos = await this.prismaConnection.testeRatinho.count(
        {
          where: filterParams,
        }
      );

      return totalTesteRatinhos;
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
