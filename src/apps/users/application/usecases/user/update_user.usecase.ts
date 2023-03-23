import { User, UserEntity } from '@/users/domain';
import { IUserRepository, UserNotFoundException } from '@/users/application';
import { IUsecase } from '@/core/application';

export class UpdateUserUsecase implements IUsecase<User, User> {
  constructor(private readonly userRepository: IUserRepository) {}

  async perform(user: User): Promise<User> {
    const userExists = await this.userRepository.getById(user.id);

    if (!userExists) {
      throw new UserNotFoundException({ id: user.id });
    }

    const userToUpdate = new UserEntity({ ...userExists, ...user });

    const userUpdated = await this.userRepository.update(userToUpdate);

    return userUpdated;
  }
}
