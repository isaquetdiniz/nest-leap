import {
  GetUsersByFilterUsecase,
  IUserRepository,
  UserFilters,
} from '@/users/application';
import { UserDTO, UserPresenter } from '@/users/interface';
import { DefaultFiltersEntity } from '@/shared/domain';
import { ILoggerProvider } from '@/shared/application';
import { IController, IValidation } from '@/shared/interface';

export type IGetUsersByFilterRequest = UserFilters;

export type IGetUsersByFilterResponse = {
  users: UserDTO[];
  totalUsersListed: number;
  totalUsers: number;
};

export class GetUsersByFilterController
  implements IController<IGetUsersByFilterRequest, IGetUsersByFilterResponse>
{
  private usecase: GetUsersByFilterUsecase;

  constructor(
    userRepository: IUserRepository,
    private readonly validation: IValidation,
    private readonly logger: ILoggerProvider,
  ) {
    this.usecase = new GetUsersByFilterUsecase(userRepository, logger);
  }

  async execute(
    request: IGetUsersByFilterRequest,
  ): Promise<IGetUsersByFilterResponse> {
    this.logger.debug({ message: 'Request received', data: request });

    this.validation.request(request);

    this.logger.debug({ message: 'Params validated' });

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

    this.logger.debug({
      message: 'Users found',
      data: { totalUsers, totalItemsListed: users?.length },
    });

    const userPresenters = users.map(UserPresenter.format);

    this.validation.response(userPresenters);

    return {
      users: userPresenters,
      totalUsers: totalUsers,
      totalUsersListed: users.length,
    };
  }
}
