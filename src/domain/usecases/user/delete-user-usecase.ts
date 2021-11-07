import { User } from '@/domain/entities';

export interface DeleteUserUsecase {
  delete(
    userParams: DeleteUserUsecase.Params
  ): Promise<DeleteUserUsecase.Result>;
}

export namespace DeleteUserUsecase {
  export type Params = {
    id: string;
    userRequester: User;
  };
  export type Result = void | Error;
}
