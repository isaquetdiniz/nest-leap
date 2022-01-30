import { UserDTO } from '@/domains/user/user';

export interface ISaveUserRepository {
  save(
    userParams: ISaveUserRepository.Params
  ): Promise<ISaveUserRepository.Result>;
}

export namespace ISaveUserRepository {
  export type Params = UserDTO;
  export type Result = UserDTO;
}
