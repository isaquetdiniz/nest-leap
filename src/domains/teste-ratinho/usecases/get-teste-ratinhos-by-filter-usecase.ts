import {
  TesteRatinho,
  IGetTesteRatinhosByFilterRepository,
  ICountTesteRatinhosByFilterRepository,
} from '@/domains/teste-ratinho';

import { DateFilter, OrderByFilter, Pagination } from '@/shared/helpers';

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
  constructor(
    private readonly getTesteRatinhosByFilterRepository: IGetTesteRatinhosByFilterRepository,
    private readonly countTesteRatinhosByFilterRepository: ICountTesteRatinhosByFilterRepository
  ) {}

  async execute(
    filterParams: IGetTesteRatinhosByFilterUsecase.Params
  ): Promise<IGetTesteRatinhosByFilterUsecase.Result> {
    const { filters } = filterParams;

    const testeRatinhosDTOS = await this.getTesteRatinhosByFilterRepository.get(
      filterParams
    );
    const totalTesteRatinhos =
      await this.countTesteRatinhosByFilterRepository.count(filters);

    const testeRatinhos = testeRatinhosDTOS.map(
      (testeRatinhoDTO) => new TesteRatinho(testeRatinhoDTO)
    );

    return {
      testeRatinhos,
      totalTesteRatinhos,
    };
  }
}
