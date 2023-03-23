import { User } from '@/users/domain';
import { IUserRepository } from '@/users/application';
import { IUsecase } from '@/core/application';

export class GetUserByEmailUsecase implements IUsecase<User['email'], User> {
  constructor(private readonly userRepository: IUserRepository) {}

  async perform(email: User['email']): Promise<User> {
    const userFound = await this.userRepository.getByEmail(email);

    if (!userFound) return null;

    return userFound;
  }
}
