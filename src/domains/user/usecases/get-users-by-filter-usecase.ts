import {
  User,
  IGetUsersByFilterRepository,
  ICountUsersByFilterRepository,
} from '@/domains/user';

import { DateFilter, OrderByFilter, Pagination } from '@/shared/helpers';
import { ILoggerLocal } from '@/shared/protocols';

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
  private logger: ILoggerLocal;

  constructor(
    private readonly getUsersByFilterRepository: IGetUsersByFilterRepository,
    private readonly countUsersByFilterRepository: ICountUsersByFilterRepository,
    logger: ILoggerLocal
  ) {
    this.logger = logger.child({ usecase: 'get-users-by-filter' });
  }

  async execute(
    filterParams: IGetUsersByFilterUsecase.Params
  ): Promise<IGetUsersByFilterUsecase.Result> {
    this.logger.logDebug({ message: 'Request received', data: filterParams });

    const { filters } = filterParams;

    const usersDTOS = await this.getUsersByFilterRepository.get(filterParams);
    const totalUsers = await this.countUsersByFilterRepository.count(filters);

    const users = usersDTOS.map((userDTO) => new User(userDTO));

    this.logger.logDebug({ message: 'Users found', data: { totalUsers } });

    return {
      users,
      totalUsers,
    };
  }
}
