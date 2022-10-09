import { User } from '@/users/domain';
import { IUserRepository, UserFilters } from '@/users/application';
import { IUsecase, ILoggerProvider } from '@/shared/application';

export class GetUsersByFilterUsecase
  implements
    IUsecase<
      UserFilters & { count?: boolean },
      { users: User[]; totalUsers: number } | { totalUsers: number }
    >
{
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly logger: ILoggerProvider,
  ) {}

  async perform(
    data: UserFilters & { count?: boolean },
  ): Promise<{ users: User[]; totalUsers: number } | { totalUsers: number }> {
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
