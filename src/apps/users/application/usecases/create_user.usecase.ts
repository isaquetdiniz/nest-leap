import { User, UserEntity, UserState } from '@/users/domain';
import {
  IUserRepository,
  IUserCloudService,
  UserAlreadyExistsException,
} from '@/users/application';
import { ILoggerProvider, IUsecase } from '@/shared/application';

export class CreateUserUsecase
  implements IUsecase<{ name: string; email: string }, User>
{
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userCloudService: IUserCloudService,
    private readonly logger: ILoggerProvider,
  ) {}

  async perform(data: { name: string; email: string }): Promise<User> {
    this.logger.debug({ message: 'Request received', data });

    const { name, email } = data;

    const userExists = await this.userRepository.getByEmail(email);

    if (userExists) {
      throw new UserAlreadyExistsException({ name, email });
    }

    const userExistsInCloud = await this.userCloudService.getByEmail(email);

    if (userExistsInCloud) {
      throw new UserAlreadyExistsException({ name, email });
    }

    const user = new UserEntity({
      name,
      email,
      state: UserState.CONFIRMED,
      enabled: true,
    });

    const userCreated = await this.userRepository.save({
      ...user,
    });

    this.logger.debug({
      message: 'User created in database',
      data: userCreated,
    });

    try {
      await this.userCloudService.save(email);

      this.logger.debug({ message: 'User created in cloud' });
    } catch (error) {
      this.logger.debug({
        message: 'User deleted',
        data: { id: userCreated.id },
      });

      await this.userRepository.deleteById(userCreated.id);

      throw error;
    }

    this.logger.debug({ message: 'User created', data: userCreated });

    return userCreated;
  }
}
