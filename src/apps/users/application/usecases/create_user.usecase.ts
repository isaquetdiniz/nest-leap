import { User, UserEntity, UserState } from '@/users/domain';
import {
  IUserEventEmitter,
  IUserRepository,
  UserAlreadyExistsException,
} from '@/users/application';
import { IUsecase } from '@/core/application';

type TCreateUser = { name: string; email: string };

export class CreateUserUsecase implements IUsecase<TCreateUser, User> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly eventEmitter: IUserEventEmitter,
  ) {}

  async perform(data: TCreateUser): Promise<User> {
    const { name, email } = data;

    const userExists = await this.userRepository.getByEmail(email);

    if (userExists) {
      throw new UserAlreadyExistsException({ name, email });
    }

    const user = new UserEntity({
      name,
      email,
      state: UserState.PENDING_CONFIRMATION,
    });

    const userCreated = await this.userRepository.save(user);

    this.eventEmitter.created(userCreated);

    return userCreated;
  }
}
