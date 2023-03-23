import {
  INotificationService,
  IUserForgotPasswordEventEmitter,
  IUserForgotPasswordRepository,
  IUserRepository,
  TUserEvent,
  UserInvalidStateException,
  UserNotFoundException,
} from '@/users/application';
import { IUsecase } from '@/core/application';
import {
  User,
  UserForgotPassword,
  UserForgotPasswordEntity,
  UserForgotPasswordState,
  UserState,
} from '@/users/domain';
import { RandomCode } from '@/core/domain';

export type TCreateUserForgotPassword = { email: User['email'] };

export class CreateUserForgotPasswordUsecase
  implements IUsecase<TUserEvent, UserForgotPassword>
{
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userForgotPasswordRepository: IUserForgotPasswordRepository,
    private readonly notificationService: INotificationService,
    private readonly eventEmitter: IUserForgotPasswordEventEmitter,
  ) {}

  async perform(data: TCreateUserForgotPassword): Promise<UserForgotPassword> {
    const { email } = data;

    const userFound = await this.userRepository.getByEmail(data.email);

    if (!userFound) {
      throw new UserNotFoundException({ email });
    }

    if (userFound.state !== UserState.CONFIRMED) {
      throw new UserInvalidStateException(userFound);
    }

    const userAlreadyForgotPassword =
      await this.userForgotPasswordRepository.getByUserAndIsPending(userFound);

    if (userAlreadyForgotPassword) {
      userAlreadyForgotPassword.state = UserForgotPasswordState.DECLINED;
      userAlreadyForgotPassword.declinedAt = new Date();

      await this.userForgotPasswordRepository.update(userAlreadyForgotPassword);
    }

    const code = this.generateRandomCode();

    const userForgotPassword = new UserForgotPasswordEntity({
      state: UserForgotPasswordState.PENDING,
      attempts: 0,
      code,
      email,
      user: userFound,
    });

    const userForgotPasswordCreated =
      await this.userForgotPasswordRepository.save(userForgotPassword);

    await this.notificationService.sendForgotPasswordEmail(
      email,
      userFound.id,
      userFound.name,
      code,
    );

    this.eventEmitter.created(userForgotPasswordCreated);

    return userForgotPasswordCreated;
  }

  generateRandomCode(): string {
    return RandomCode.generate(5);
  }
}
