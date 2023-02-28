import { User, UserEntity } from '@/users/domain';
import { IUserRepository, UserNotFoundException } from '@/users/application';
import { ILoggerProvider } from '@/core/application';

export class UpdateUserUsecase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly logger: ILoggerProvider,
  ) {}

  async perform(user: User): Promise<User> {
    this.logger.debug({ message: 'Request received', user });

    const userExists = await this.userRepository.getById(user.id);

    if (!userExists) {
      throw new UserNotFoundException({ id: user.id });
    }

    this.logger.debug({ message: 'User found', data: userExists });

    const userToUpdate = new UserEntity({ ...userExists, ...user });

    const userUpdated = await this.userRepository.update(userToUpdate);

    this.logger.debug({ message: 'User updated', data: userUpdated });

    return userUpdated;
  }
}
