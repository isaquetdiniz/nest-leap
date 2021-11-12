import { User } from '@/domain/entities';

export interface DeleteUserInDatabaseRepository {
  deleteUser(
    userParams: DeleteUserInDatabaseRepository.Params
  ): Promise<DeleteUserInDatabaseRepository.Result>;
}

export namespace DeleteUserInDatabaseRepository {
  export type Params = User;
  export type Result = void;
}
