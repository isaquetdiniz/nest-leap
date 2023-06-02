import { GetUserByEmailUsecase, IUserRepository } from '@/users/application';
import { IController } from '@/core/interface';
import { User, UserState } from '@/users/domain';
import { AutoValidator } from '@/libs/class-validator';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Min,
} from 'class-validator';

export type IGetUserByEmailRequest = Pick<User, 'email'>;
export type IGetUserByEmailResponse = Omit<User, 'isConfirmed'>;

export class GetUserByEmailRequest
  extends AutoValidator
  implements IGetUserByEmailRequest
{
  @IsEmail()
  email: User['email'];

  constructor(props: IGetUserByEmailRequest) {
    super(props);
  }
}

export class GetUserByEmailResponse
  extends AutoValidator
  implements IGetUserByEmailResponse
{
  @IsUUID(4)
  id: User['id'];

  @IsInt()
  @Min(1)
  serial: User['serial'];

  @IsEnum(UserState)
  state: User['state'];

  @IsString()
  @Length(1, 255)
  name: User['name'];

  @IsEmail()
  email: User['email'];

  @IsString()
  @Length(8)
  password: User['password'];

  @IsOptional()
  @IsDate()
  createdAt: User['createdAt'];

  @IsOptional()
  @IsDate()
  updatedAt: User['updatedAt'];

  constructor(props: IGetUserByEmailResponse) {
    super(props);
  }
}

export class GetUserByEmailController
  implements IController<GetUserByEmailRequest, GetUserByEmailResponse>
{
  private usecase: GetUserByEmailUsecase;

  constructor(userRepository: IUserRepository) {
    this.usecase = new GetUserByEmailUsecase(userRepository);
  }

  async execute(
    request: GetUserByEmailRequest,
  ): Promise<GetUserByEmailResponse> {
    const user = await this.usecase.perform(request.email);

    const response =
      user &&
      new GetUserByEmailResponse({
        id: user.id,
        serial: user.serial,
        state: user.state,
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });

    return response;
  }
}
