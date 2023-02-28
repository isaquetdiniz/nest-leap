import { IUserRepository, UserNotFoundException } from '@/users/application';
import { ILoggerProvider } from '@/core/application';

export class DeleteUserByIdUsecase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly logger: ILoggerProvider,
  ) {}

  async perform(id: string): Promise<void> {
    this.logger.debug({ message: 'Request Received', data: { id } });

    const userExists = await this.userRepository.getById(id);

    if (!userExists) {
      throw new UserNotFoundException({ id });
    }

    this.logger.debug({
      message: 'User found in database',
      data: userExists,
    });

    await this.userRepository.deleteById(id);

    this.logger.debug({
      message: 'User delete from database',
      data: { id },
    });
  }
}
