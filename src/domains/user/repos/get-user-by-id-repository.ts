import { UserDTO } from '@/domains/user/user';

export interface IGetUserByIdRepository {
  getById(
    id: IGetUserByIdRepository.Params
  ): Promise<IGetUserByIdRepository.Result>;
}

export namespace IGetUserByIdRepository {
  export type Params = string;
  export type Result = UserDTO | null;
}
