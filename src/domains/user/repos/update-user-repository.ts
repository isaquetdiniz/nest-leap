import { UserDTO } from '@/domains/user';

export interface IUpdateUserRepository {
  update(
    userToUpdate: IUpdateUserRepository.Params
  ): Promise<IUpdateUserRepository.Result>;
}

export namespace IUpdateUserRepository {
  export type Params = UserDTO;
  export type Result = UserDTO;
}
