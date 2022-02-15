import { UserDTO } from '@/domains/user';
import { UserFilters } from '../get-users-by-filter-usecase';

export interface IGetUsersByFilterRepository {
  get(
    params: IGetUsersByFilterRepository.Params
  ): Promise<IGetUsersByFilterRepository.Result>;
}

export namespace IGetUsersByFilterRepository {
  export type Params = UserFilters;
  export type Result = UserDTO[];
}
