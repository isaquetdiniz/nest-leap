import {
  GetUsersByFilterUsecase,
  IUserRepository,
  UserFilters,
} from '@/users/application';
import { UserDTO, UserPresenter } from '@/users/interface';
import { DefaultFiltersEntity } from '@/core/domain';
import { ILoggerProvider } from '@/core/application';
import { Controller, IValidation } from '@/core/interface';

export type IGetUsersByFilterRequest = UserFilters;

export type IGetUsersByFilterResponse = {
  users: UserDTO[];
  totalUsersListed: number;
  totalUsers: number;
};

export class GetUsersByFilterController extends Controller<
  IGetUsersByFilterRequest,
  IGetUsersByFilterResponse
> {
  private usecase: GetUsersByFilterUsecase;

  constructor(
    userRepository: IUserRepository,
    validation: IValidation,
    logger: ILoggerProvider,
  ) {
    super(validation, logger);
    this.usecase = new GetUsersByFilterUsecase(userRepository, logger);
  }

  async perform(
    request: IGetUsersByFilterRequest,
  ): Promise<IGetUsersByFilterResponse> {
    const { take, skip, orderBy, createdAt, updatedAt, ...restFilters } =
      request;

    const defaultFilters = new DefaultFiltersEntity({
      take,
      skip,
      orderBy,
      createdAt,
      updatedAt,
    });

    const { users, totalUsers } = await this.usecase.perform({
      ...restFilters,
      ...defaultFilters,
    });

    const userPresenters = users.map(UserPresenter.format);

    return {
      users: userPresenters,
      totalUsers: totalUsers,
      totalUsersListed: users.length,
    };
  }
}
