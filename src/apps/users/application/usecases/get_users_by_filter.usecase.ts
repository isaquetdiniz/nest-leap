import { User } from '@/users/domain';
import { IUserRepository, UserFilters } from '@/users/application';
import { IUsecase, ILoggerProvider } from '@/shared/application';

type UserFiltersType = UserFilters & { count?: boolean };
type GetUserResponse =
  | { users: User[]; totalUsers: number }
  | { totalUsers: number };

export class GetUsersByFilterUsecase
  implements IUsecase<UserFiltersType, GetUserResponse>
{
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly logger: ILoggerProvider,
  ) {}

  async perform(data: UserFiltersType): Promise<GetUserResponse> {
    this.logger.debug({ message: 'Request received', data });

    const { count, ...restFilterParams } = data;

    const totalUsers = await this.userRepository.count(restFilterParams);

    if (count) {
      return {
        totalUsers,
      };
    }

    const users = await this.userRepository.getByFilter(restFilterParams);

    this.logger.debug({ message: 'Users found', data: { users } });

    return {
      users,
      totalUsers,
    };
  }
}
