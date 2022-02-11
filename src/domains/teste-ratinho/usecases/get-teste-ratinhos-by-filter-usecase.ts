import {
  TesteRatinho,
  IGetTesteRatinhosByFilterRepository,
  ICountTesteRatinhosByFilterRepository,
} from '@/domains/teste-ratinho';

import { DateFilter, OrderByFilter, Pagination } from '@/shared/helpers';

import { ILoggerLocal } from '@/shared/protocols';

export type TesteRatinhoFilters = {
  filters: {
    name?: string;
    enabled?: boolean;
    createdAt?: DateFilter;
    updatedAt?: DateFilter;
  };
  orderBy: OrderByFilter;
  pagination: Pagination;
};

export interface IGetTesteRatinhosByFilterUsecase {
  execute(
    listParams: IGetTesteRatinhosByFilterUsecase.Params
  ): Promise<IGetTesteRatinhosByFilterUsecase.Result>;
}

export namespace IGetTesteRatinhosByFilterUsecase {
  export type Params = TesteRatinhoFilters;
  export type Result = {
    testeRatinhos: TesteRatinho[];
    totalTesteRatinhos: number;
  };
}

export class GetTesteRatinhosByFilterUsecase
  implements IGetTesteRatinhosByFilterUsecase
{
  private logger: ILoggerLocal;

  constructor(
    private readonly getTesteRatinhosByFilterRepository: IGetTesteRatinhosByFilterRepository,
    private readonly countTesteRatinhosByFilterRepository: ICountTesteRatinhosByFilterRepository,
    logger: ILoggerLocal
  ) {
    this.logger = logger.child({ usecase: 'get-teste-ratinhos-by-filter' });
  }

  async execute(
    filterParams: IGetTesteRatinhosByFilterUsecase.Params
  ): Promise<IGetTesteRatinhosByFilterUsecase.Result> {
    this.logger.logDebug({ message: 'Request received', data: filterParams });

    const { filters } = filterParams;

    const testeRatinhosDTOS = await this.getTesteRatinhosByFilterRepository.get(
      filterParams
    );
    const totalTesteRatinhos =
      await this.countTesteRatinhosByFilterRepository.count(filters);

    const testeRatinhos = testeRatinhosDTOS.map(
      (testeRatinhoDTO) => new TesteRatinho(testeRatinhoDTO)
    );

    this.logger.logDebug({
      message: 'TesteRatinhos found',
      data: { totalTesteRatinhos },
    });

    return {
      testeRatinhos,
      totalTesteRatinhos,
    };
  }
}
