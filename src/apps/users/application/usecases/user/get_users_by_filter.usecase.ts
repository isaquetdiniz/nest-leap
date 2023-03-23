import { User } from '@/users/domain';
import { IUserRepository, UserFilters } from '@/users/application';
import { IUsecase } from '@/core/application';

type UserFiltersType = UserFilters;
type GetUserResponse = { users: User[]; totalUsers: number };

export class GetUsersByFilterUsecase
  implements IUsecase<UserFiltersType, GetUserResponse>
{
  constructor(private readonly userRepository: IUserRepository) {}

  async perform(data: UserFiltersType): Promise<GetUserResponse> {
    const totalUsers = await this.userRepository.count(data);

    const users = await this.userRepository.getByFilter(data);

    return {
      users,
      totalUsers,
    };
  }
}
