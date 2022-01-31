import { DateFilter } from '@/shared/helpers';

export interface ICountUsersByFilterRepository {
  count(
    filter: ICountUsersByFilterRepository.Params
  ): Promise<ICountUsersByFilterRepository.Result>;
}

export namespace ICountUsersByFilterRepository {
  export type Params = {
    name?: string;
    email?: string;
    isAdmin?: boolean;
    enabled?: boolean;
    createdAt?: DateFilter;
    updatedAt?: DateFilter;
  };
  export type Result = number;
}
