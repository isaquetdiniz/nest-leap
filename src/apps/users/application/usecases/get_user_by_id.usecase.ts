import { User } from '@/users/domain';
import { IUserRepository } from '@/users/application';
import { ILoggerProvider } from '@/core/application';

export class GetUserByIdUsecase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly logger: ILoggerProvider,
  ) {}

  async perform(id: string): Promise<User | null> {
    this.logger.debug({ message: 'Request Received', data: { id } });

    const userExists = await this.userRepository.getById(id);

    if (!userExists) return null;

    this.logger.debug({
      message: 'User found',
      data: userExists,
    });

    return userExists;
  }
}
