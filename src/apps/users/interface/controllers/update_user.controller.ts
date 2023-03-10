import { User, UserEntity, UserState } from '@/users/domain';
import { IUserRepository, UpdateUserUsecase } from '@/users/application';
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

export interface IUpdateUserRequest {
  id: string;
  name?: string;
  email?: string;
}
export type IUpdateUserResponse = Omit<User, 'password'>;

export class UpdateUserRequest
  extends AutoValidator
  implements IUpdateUserRequest
{
  @IsUUID(4)
  id: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  name: string;

  @IsString()
  @Length(1, 255)
  email: string;

  constructor(props: IUpdateUserRequest) {
    super(props);
  }
}

export class UpdateUserResponse
  extends AutoValidator
  implements IUpdateUserResponse
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

  constructor(props: IUpdateUserResponse) {
    super(props);
  }
}

export class UpdateUserByIdController
  implements IController<IUpdateUserRequest, IUpdateUserResponse>
{
  private usecase: UpdateUserUsecase;

  constructor(userRepository: IUserRepository) {
    this.usecase = new UpdateUserUsecase(userRepository);
  }

  async execute(request: IUpdateUserRequest): Promise<IUpdateUserResponse> {
    const userToUpdate = new UserEntity({
      id: request.id,
      name: request.name,
      email: request.email,
    });

    const userUpdated = await this.usecase.perform(userToUpdate);

    return new UpdateUserResponse(userUpdated);
  }
}
