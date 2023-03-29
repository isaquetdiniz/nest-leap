import {
  CreateUserUsecase,
  IUserEventEmitter,
  IUserRepository,
} from '@/users/application';
import { User, UserState } from '@/users/domain';
import { IController } from '@/core/interface';
import { AutoValidator } from '@/libs/class-validator';
import { IsEmail, IsEnum, IsString, IsUUID, Length } from 'class-validator';

export type TCreateUserRequest = Pick<User, 'name' | 'email' | 'password'>;
export type TCreateUserResponse = Pick<
  User,
  'id' | 'name' | 'email' | 'state' | 'createdAt'
>;

export class CreateUserRequest
  extends AutoValidator
  implements TCreateUserRequest
{
  @IsString()
  @Length(1, 255)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8)
  password: string;

  constructor(props: TCreateUserRequest) {
    super(props);
  }
}

export class CreateUserResponse
  extends AutoValidator
  implements TCreateUserResponse
{
  @IsUUID(4)
  id: string;

  @IsEnum(UserState)
  state: UserState;

  @IsString()
  @Length(1, 255)
  name: string;

  @IsEmail()
  email: string;

  constructor(props: TCreateUserResponse) {
    super(props);
  }
}

export class CreateUserController
  implements IController<CreateUserRequest, CreateUserResponse>
{
  private usecase: CreateUserUsecase;

  constructor(
    userRepository: IUserRepository,
    eventEmitter: IUserEventEmitter,
  ) {
    this.usecase = new CreateUserUsecase(userRepository, eventEmitter);
  }

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const userCreated = await this.usecase.perform({
      name: request.name,
      email: request.email,
      password: request.password,
    });

    return new CreateUserResponse({
      id: userCreated.id,
      state: userCreated.state,
      name: userCreated.name,
      email: userCreated.email,
    });
  }
}
