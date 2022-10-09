import { User } from '@/users/domain';
import {
  IUserRepository,
  UserNotFoundException,
  IUserCloudService,
} from '@/users/application';
import { ILoggerProvider, IUsecase } from '@/shared/application';

export class GetUserByIdUsecase implements IUsecase<string, User | null> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userCloudService: IUserCloudService,
    private readonly logger: ILoggerProvider,
  ) {}

  async perform(id: string): Promise<User | null> {
    this.logger.debug({ message: 'Request Received', data: { id } });

    const userExists = await this.userRepository.getById(id);

    if (!userExists) return null;

    this.logger.debug({
      message: 'User found in database',
      data: userExists,
    });

    const { email } = userExists;

    const userExistsInCloud = await this.userCloudService.getByEmail(email);

    if (!userExistsInCloud) {
      throw new UserNotFoundException({ email });
    }

    this.logger.debug({
      message: 'User found in cloud',
      data: userExistsInCloud,
    });

    this.logger.debug({
      message: 'User found',
      data: userExists,
    });

    return userExists;
  }
}
