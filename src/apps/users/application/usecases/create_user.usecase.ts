import { User, UserEntity, UserState } from '@/users/domain';
import {
  IUserRepository,
  UserAlreadyExistsException,
} from '@/users/application';
import { ILoggerProvider } from '@/core/application';

type CreateUserType = { name: string; email: string };

export class CreateUserUsecase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly logger: ILoggerProvider,
  ) {}

  async perform(data: CreateUserType): Promise<User> {
    this.logger.debug({ message: 'Request received', data });

    const { name, email } = data;

    const userExists = await this.userRepository.getByEmail(email);

    if (userExists) {
      throw new UserAlreadyExistsException({ name, email });
    }

    const user = new UserEntity({
      name,
      email,
      state: UserState.CONFIRMED,
    });

    const userCreated = await this.userRepository.save(user);

    this.logger.debug({
      message: 'User created in database',
      data: userCreated,
    });

    return userCreated;
  }
}
