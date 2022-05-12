import { User } from '@/domains/user';

export interface IUpdateUserRepository {
  update(
    userToUpdate: IUpdateUserRepository.Params
  ): Promise<IUpdateUserRepository.Result>;
}

export namespace IUpdateUserRepository {
  export type Params = User;
  export type Result = User;
}
