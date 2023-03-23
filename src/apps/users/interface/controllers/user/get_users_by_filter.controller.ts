import {
  GetUsersByFilterUsecase,
  IUserRepository,
  UserFilters,
} from '@/users/application';
import {
  DefaultFiltersEntity,
  DefaultFiltersRequest,
  PaginationResponse,
  TPaginationResponse,
} from '@/core/domain';
import { IController } from '@/core/interface';
import { User } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { AutoValidator } from '@/libs/class-validator';
import { UserState } from '@/users/domain';
/*
export type IGetUsersByFilterRequest = UserFilters;
export type IGetUserByFilterResponseItem = User;
export type IGetUsersByFilterResponse =
  TPaginationResponse<IGetUserByFilterResponseItem>;

export class GetUsersByFilterRequest
  extends DefaultFiltersRequest
  implements IGetUsersByFilterRequest
{
  @IsOptional()
  @IsString()
  @Length(1, 255)
  name: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  email: string;

  constructor(props: IGetUsersByFilterRequest) {
    super(props);
  }
}

export class GetUserByFilterResponseItem
  extends AutoValidator
  implements IGetUserByFilterResponseItem
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

  constructor(props: IGetUserByFilterResponseItem) {
    super(props);
  }
}

export class GetUsersByFilterResponse extends PaginationResponse<IGetUserByFilterResponseItem> {}

export class GetUsersByFilterController
  implements IController<IGetUsersByFilterRequest, IGetUsersByFilterResponse>
{
  private usecase: GetUsersByFilterUsecase;

  constructor(userRepository: IUserRepository) {
    this.usecase = new GetUsersByFilterUsecase(userRepository);
  }

  async execute(
    request: IGetUsersByFilterRequest,
  ): Promise<IGetUsersByFilterResponse> {
    const { take, skip, orderBy, createdAt, updatedAt, ...restFilters } =
      request;

    const defaultFilters = new DefaultFiltersEntity({
      take,
      skip,
      orderBy,
      createdAt,
      updatedAt,
    });

    const { users, totalUsers } = await this.usecase.perform({
      ...restFilters,
      ...defaultFilters,
    });

    const userPresenters = users.map(UserPresenter.format);

    return {
      users: userPresenters,
      totalUsers: totalUsers,
      totalUsersListed: users.length,
    };
  }
}

*/
