import {
  IUserRepository,
  UserNotFoundException,
  IUserCloudService,
} from '@/users/application';
import { ILoggerProvider, IUsecase } from '@/shared/application';

export class DeleteUserByIdUsecase implements IUsecase<string, void> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userCloudService: IUserCloudService,
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

    const { email } = userExists;

    const userExistsInCloud = await this.userCloudService.getByEmail(email);

    if (!userExistsInCloud) {
      throw new UserNotFoundException({ email });
    }

    this.logger.debug({
      message: 'User found in cloud',
      data: userExistsInCloud,
    });

    await this.userCloudService.deleteByEmail(email);

    this.logger.debug({
      message: 'User deleted from cloud',
      data: { email },
    });

    await this.userRepository.deleteById(id);

    this.logger.debug({
      message: 'User delete from database',
      data: { id },
    });
  }
}
