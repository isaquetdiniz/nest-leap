import { User } from '@/users/domain';
import { IUserRepository, UserFilters } from '@/users/application';
import { IUsecase, ILoggerProvider } from '@/shared/application';

export class GetUsersByFilterUsecase
  implements IUsecase<UserFilters, { users: User[]; totalUsers: number }>
{
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly logger: ILoggerProvider,
  ) {}

  async perform(
    data: UserFilters,
  ): Promise<{ users: User[]; totalUsers: number }> {
    this.logger.debug({ message: 'Request received', data });

    const totalUsers = await this.userRepository.count(data);

    const users = await this.userRepository.getByFilter(data);

    this.logger.debug({ message: 'Users found', data: { users } });

    return {
      users,
      totalUsers,
    };
  }
}
