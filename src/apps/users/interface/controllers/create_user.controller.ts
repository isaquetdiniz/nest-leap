import {
  CreateUserUsecase,
  IUserEventEmitter,
  IUserRepository,
} from '@/users/application';
import { User, UserState } from '@/users/domain';
import { IController } from '@/core/interface';
import { AutoValidator } from '@/libs/class-validator';
import {
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export type TCreateUserRequest = Pick<User, 'name' | 'email'>;
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

  @IsString()
  @Length(1, 255)
  email: string;
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

  @IsString()
  @Length(1, 255)
  email: string;

  @IsOptional()
  @IsDate()
  createdAt: Date;

  constructor(props: TCreateUserResponse) {
    super(props);
  }
}

export class CreateUserController
  implements IController<TCreateUserRequest, TCreateUserResponse>
{
  private usecase: CreateUserUsecase;

  constructor(
    userRepository: IUserRepository,
    eventEmitter: IUserEventEmitter,
  ) {
    this.usecase = new CreateUserUsecase(userRepository, eventEmitter);
  }

  async execute(request: TCreateUserRequest): Promise<TCreateUserResponse> {
    const userCreated = await this.usecase.perform({
      name: request.name,
      email: request.email,
    });

    return new CreateUserResponse(userCreated);
  }
}
