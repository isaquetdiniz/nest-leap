import {
  ISaveRepository,
  IUpdateRepository,
  IGetByIdRepository,
  IDeleteByIdRepository,
  IGetByFilterRepository,
  ICountRepository,
} from '@/shared/application';
import { User } from '@/users/domain';

export type UserFilter = {
  name?: string;
  email?: string;
};

export type ISaveUserRepository = ISaveRepository<User>;
export type IGetByIdUserRepository = IGetByIdRepository<User>;
export type IUpdateUserRepository = IUpdateRepository<User>;
export type IDeleteUserByIdRepository = IDeleteByIdRepository<User>;
export type IGetUsersByFilterRepository = IGetByFilterRepository<
  UserFilter,
  User
>;
export type ICountUsersRepository = ICountRepository<UserFilter>;

export type IUserRepository = ISaveUserRepository &
  IUpdateUserRepository &
  IGetByIdUserRepository &
  IDeleteUserByIdRepository;
