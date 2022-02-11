import { TesteRatinhoDTO } from '@/domains/teste-ratinho';
import { TesteRatinhoFilters } from '../get-teste-ratinhos-by-filter-usecase';

export interface IGetTesteRatinhosByFilterRepository {
  get(
    params: IGetTesteRatinhosByFilterRepository.Params
  ): Promise<IGetTesteRatinhosByFilterRepository.Result>;
}

export namespace IGetTesteRatinhosByFilterRepository {
  export type Params = TesteRatinhoFilters;
  export type Result = TesteRatinhoDTO[];
}
