import { User } from '@/domains/user';

export interface IGetUserByEmailRepository {
  getByEmail(
    email: IGetUserByEmailRepository.Params
  ): Promise<IGetUserByEmailRepository.Result>;
}

export namespace IGetUserByEmailRepository {
  export type Params = string;
  export type Result = Pick<User, 'id'> | null;
}
