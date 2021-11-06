import { UserToJSON } from '@/domain/entities';
import { ListUsersUsecase } from '@/domain/usecases/user';

export interface ListUsersInDatabaseRepository {
  listUser(
    userFilters: ListUsersInDatabaseRepository.Params
  ): Promise<ListUsersInDatabaseRepository.Result>;
}

export namespace ListUsersInDatabaseRepository {
  export type Params = ListUsersUsecase.Params;
  export type Result = { users: UserToJSON[]; totalUsers: number };
}
