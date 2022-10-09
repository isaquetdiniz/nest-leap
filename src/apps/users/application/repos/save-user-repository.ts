import { User } from '@/domains/user/entities';

export interface ISaveUserRepository {
  save(
    userParams: ISaveUserRepository.Params
  ): Promise<ISaveUserRepository.Result>;
}

export namespace ISaveUserRepository {
  export type Params = User;
  export type Result = User;
}
