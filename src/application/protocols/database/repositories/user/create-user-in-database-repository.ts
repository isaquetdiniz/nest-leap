import { User } from '@/domain/entities';

export interface CreateUserInDatabaseRepository {
  createUser(
    userParams: CreateUserInDatabaseRepository.Params
  ): Promise<CreateUserInDatabaseRepository.Result>;
}

export namespace CreateUserInDatabaseRepository {
  export type Params = User;
  export type Result = void;
}
