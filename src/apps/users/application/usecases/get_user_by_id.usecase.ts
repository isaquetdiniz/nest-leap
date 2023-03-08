import { User } from '@/users/domain';
import { IUserRepository } from '@/users/application';
import { IUsecase } from '@/core/application';

export class GetUserByIdUsecase implements IUsecase<string, User> {
  constructor(private readonly userRepository: IUserRepository) {}

  async perform(id: string): Promise<User | null> {
    const userExists = await this.userRepository.getById(id);

    if (!userExists) return null;

    return userExists;
  }
}
