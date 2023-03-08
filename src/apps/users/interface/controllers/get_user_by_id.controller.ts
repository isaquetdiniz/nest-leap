import { GetUserByIdUsecase, IUserRepository } from '@/users/application';
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

export type IGetUserByIdRequest = Pick<User, 'id'>;
export type IGetUserByIdResponse = User;

export class GetUserByIdRequest
  extends AutoValidator
  implements IGetUserByIdRequest
{
  @IsUUID(4)
  id: string;

  constructor(props: IGetUserByIdRequest) {
    super(props);
  }
}

export class GetUserByIdResponse
  extends AutoValidator
  implements IGetUserByIdResponse
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

  @IsOptional()
  @IsDate()
  updatedAt: Date;

  constructor(props: IGetUserByIdResponse) {
    super(props);
  }
}

export class GetUserByIdController
  implements IController<IGetUserByIdRequest, IGetUserByIdResponse>
{
  private usecase: GetUserByIdUsecase;

  constructor(userRepository: IUserRepository) {
    this.usecase = new GetUserByIdUsecase(userRepository);
  }

  async execute(request: IGetUserByIdRequest): Promise<IGetUserByIdResponse> {
    const user = await this.usecase.perform(request.id);

    const response = user && new GetUserByIdResponse(user);

    return response;
  }
}
