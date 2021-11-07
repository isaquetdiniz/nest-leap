import { User, UserInput } from '@/domain/entities/User';

export interface CreateUserInDatabaseUsecase {
  create(
    userParams: CreateUserInDatabaseUsecase.Params
  ): Promise<CreateUserInDatabaseUsecase.Result>;
}

export namespace CreateUserInDatabaseUsecase {
  export type Params = Omit<UserInput, 'id'>;
  export type Result = User;
}
