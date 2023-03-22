import {
  ConfirmUserUsecase,
  IUserConfirmationRepository,
  IUserEventEmitter,
  IUserRepository,
} from '@/users/application';
import { User, UserConfirmation, UserState } from '@/users/domain';
import { IController } from '@/core/interface';
import { AutoValidator } from '@/libs/class-validator';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export type TConfirmUserRequest = Pick<UserConfirmation, 'code' | 'email'>;
export type TConfirmUserResponse = Pick<
  User,
  'id' | 'name' | 'email' | 'state' | 'createdAt'
>;

export class ConfirmUserRequest
  extends AutoValidator
  implements TConfirmUserRequest
{
  @IsString()
  @Length(5)
  code: string;

  @IsString()
  @IsEmail()
  email: string;

  constructor(props: TConfirmUserRequest) {
    super(props);
  }
}

export class ConfirmUserResponse
  extends AutoValidator
  implements TConfirmUserResponse
{
  @IsUUID(4)
  id: string;

  @IsEnum(UserState)
  state: UserState;

  @IsString()
  @Length(1, 255)
  name: string;

  @IsString()
  @Length(1, 255)
  email: string;

  @IsOptional()
  @IsDate()
  createdAt: Date;

  constructor(props: TConfirmUserResponse) {
    super(props);
  }
}

export class ConfirmUserController
  implements IController<TConfirmUserRequest, TConfirmUserResponse>
{
  private usecase: ConfirmUserUsecase;

  constructor(
    userRepository: IUserRepository,
    userConfirmationRepository: IUserConfirmationRepository,
    eventEmitter: IUserEventEmitter,
  ) {
    this.usecase = new ConfirmUserUsecase(
      userRepository,
      userConfirmationRepository,
      eventEmitter,
    );
  }

  async execute(request: TConfirmUserRequest): Promise<TConfirmUserResponse> {
    const userConfirmd = await this.usecase.perform({
      email: request.email,
      code: request.code,
    });

    return new ConfirmUserResponse({
      id: userConfirmd.id,
      state: userConfirmd.state,
      name: userConfirmd.name,
      email: userConfirmd.email,
      createdAt: userConfirmd.createdAt,
    });
  }
}
