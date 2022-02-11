import { DateFilter } from '@/shared/helpers';

export interface ICountTesteRatinhosByFilterRepository {
  count(
    filter: ICountTesteRatinhosByFilterRepository.Params
  ): Promise<ICountTesteRatinhosByFilterRepository.Result>;
}

export namespace ICountTesteRatinhosByFilterRepository {
  export type Params = {
    name?: string;
    enabled?: boolean;
    createdAt?: DateFilter;
    updatedAt?: DateFilter;
  };
  export type Result = number;
}
