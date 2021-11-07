import { User } from '@/domain/entities/User';

export interface UpdateUserUsecase {
  update(
    userParams: UpdateUserUsecase.Params
  ): Promise<UpdateUserUsecase.Result>;
}

export namespace UpdateUserUsecase {
  export type Params = {
    id: string;
    isAdmin?: boolean;
    name?: string;
    email?: string;
    enabled?: boolean;
  };
  export type Result = User | Error;
}
