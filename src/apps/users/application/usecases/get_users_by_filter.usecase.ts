import { User } from '@/users/domain';
import { IUserRepository, UserFilters } from '@/users/application';
import { ILoggerProvider } from '@/core/application';

type UserFiltersType = UserFilters;
type GetUserResponse = { users: User[]; totalUsers: number };

export class GetUsersByFilterUsecase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly logger: ILoggerProvider,
  ) {}

  async perform(data: UserFiltersType): Promise<GetUserResponse> {
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
