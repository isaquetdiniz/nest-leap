import {
  User,
  IGetUsersByFilterRepository,
  ICountUsersByFilterRepository,
} from '@/domains/user';

import { DateFilter, OrderByFilter, Pagination } from '@/shared/helpers';

export type UserFilters = {
  filters: {
    name?: string;
    email?: string;
    isAdmin?: boolean;
    enabled?: boolean;
    createdAt?: DateFilter;
    updatedAt?: DateFilter;
  };
  orderBy: OrderByFilter;
  pagination: Pagination;
};

export interface IGetUsersByFilterUsecase {
  execute(
    listParams: IGetUsersByFilterUsecase.Params
  ): Promise<IGetUsersByFilterUsecase.Result>;
}

export namespace IGetUsersByFilterUsecase {
  export type Params = UserFilters;
  export type Result = { users: User[]; totalUsers: number };
}

export class GetUsersByFilterUsecase implements IGetUsersByFilterUsecase {
  constructor(
    private readonly getUsersByFilterRepository: IGetUsersByFilterRepository,
    private readonly countUsersByFilterRepository: ICountUsersByFilterRepository
  ) {}

  async execute(
    filterParams: IGetUsersByFilterUsecase.Params
  ): Promise<IGetUsersByFilterUsecase.Result> {
    const { filters } = filterParams;

    const usersDTOS = await this.getUsersByFilterRepository.get(filterParams);
    const totalUsers = await this.countUsersByFilterRepository.count(filters);

    const users = usersDTOS.map((userDTO) => new User(userDTO));

    return {
      users,
      totalUsers,
    };
  }
}
