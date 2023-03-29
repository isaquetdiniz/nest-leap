import { User, UserEntity, UserState } from '@/users/domain';
import {
  IUserEventEmitter,
  IUserRepository,
  UserAlreadyExistsException,
} from '@/users/application';
import { IUsecase } from '@/core/application';

type TCreateUser = { name: string; email: string; password: string };

export class CreateUserUsecase implements IUsecase<TCreateUser, User> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly eventEmitter: IUserEventEmitter,
  ) {}

  async perform(data: TCreateUser): Promise<User> {
    const { name, email, password } = data;

    const userExists = await this.userRepository.getByEmail(email);

    if (userExists && userExists.isConfirmed()) {
      throw new UserAlreadyExistsException({ name, email });
    }

    if (userExists) {
      return userExists;
    }

    const user = new UserEntity({
      name,
      email,
      state: UserState.PENDING_CONFIRMATION,
      password,
    });

    const userCreated = await this.userRepository.save(user);

    this.eventEmitter.created(userCreated);

    return userCreated;
  }
}
