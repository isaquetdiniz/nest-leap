import { GetUserByEmailUsecase, IUserRepository } from '@/users/application';
import { IController } from '@/core/interface';
import { User, UserState } from '@/users/domain';
import { AutoValidator } from '@/libs/class-validator';
import {
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export type IGetUserByEmailRequest = Pick<User, 'email'>;
export type IGetUserByEmailResponse = User;

export class GetUserByEmailRequest
  extends AutoValidator
  implements IGetUserByEmailRequest
{
  @IsString()
  @Length(1, 255)
  email: string;

  constructor(props: IGetUserByEmailRequest) {
    super(props);
  }
}

export class GetUserByEmailResponse
  extends AutoValidator
  implements IGetUserByEmailResponse
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

  @IsString()
  @Length(1, 255)
  password: string;

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;

  constructor(props: IGetUserByEmailResponse) {
    super(props);
  }
}

export class GetUserByEmailController
  implements IController<IGetUserByEmailRequest, IGetUserByEmailResponse>
{
  private usecase: GetUserByEmailUsecase;

  constructor(userRepository: IUserRepository) {
    this.usecase = new GetUserByEmailUsecase(userRepository);
  }

  async execute(
    request: IGetUserByEmailRequest,
  ): Promise<IGetUserByEmailResponse> {
    const user = await this.usecase.perform(request.email);

    const response =
      user &&
      new GetUserByEmailResponse({
        id: user.id,
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
