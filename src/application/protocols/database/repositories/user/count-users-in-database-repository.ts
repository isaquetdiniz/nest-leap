import { ListUsersUsecase } from '@/domain/usecases/user';

export interface CountUsersInDatabaseRepository {
  countUsers(
    userFilters: CountUsersInDatabaseRepository.Params
  ): Promise<CountUsersInDatabaseRepository.Result>;
}

export namespace CountUsersInDatabaseRepository {
  export type Params = Omit<
    ListUsersUsecase.Params,
    'take' | 'skip' | 'orderBy'
  >;
  export type Result = { totalUsers: number };
}
