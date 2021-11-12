import { User } from '@/domain/entities';

export interface UpdateUserInDatabaseRepository {
  updateUser(
    userParams: UpdateUserInDatabaseRepository.Params
  ): Promise<UpdateUserInDatabaseRepository.Result>;
}

export namespace UpdateUserInDatabaseRepository {
  export type Params = User;
  export type Result = void;
}
