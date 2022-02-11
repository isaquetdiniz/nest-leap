import { Validation } from '@/shared/interface/validation/protocols';
import {
  UserDTO,
  UserTransformer,
  GetUsersByFilterUsecase,
  IGetUsersByFilterRepository,
  ICountUsersByFilterRepository,
} from '@/domains/user';
import {
  DateFilter,
  OrderByFilter,
  OrderByMode,
  Pagination,
  ValidationException,
} from '@/shared/helpers';

export interface GetUsersByFilterRequest {
  name?: string;
  email?: string;
  isAdmin?: boolean;
  enabled?: boolean;
  createdAt?: DateFilter;
  updatedAt?: DateFilter;
  orderBy: {
    property?: string;
    mode?: OrderByMode;
  };
  take?: number;
  skip?: number;
}

export interface GetUsersByFilterResponse {
  items: UserDTO[];
  totalItemsListed: number;
  totalItems: number;
}

export class GetUsersByFilterController {
  private usecase: GetUsersByFilterUsecase;

  constructor(
    getUsersByFilterRepository: IGetUsersByFilterRepository,
    countUsersByFilterRepository: ICountUsersByFilterRepository,
    private readonly validation: Validation
  ) {
    this.usecase = new GetUsersByFilterUsecase(
      getUsersByFilterRepository,
      countUsersByFilterRepository
    );
  }

  async execute(
    request: GetUsersByFilterRequest
  ): Promise<GetUsersByFilterResponse> {
    const hasErrors = this.validation.validate(request);

    if (hasErrors) {
      throw new ValidationException(hasErrors);
    }

    const {
      orderBy: orderByDTO,
      take,
      skip,
      name,
      email,
      isAdmin,
      enabled,
      createdAt,
      updatedAt,
    } = request;

    const filters = {
      name,
      email,
      isAdmin,
      enabled,
      createdAt,
      updatedAt,
    };

    const orderBy = new OrderByFilter(orderByDTO);
    const pagination = new Pagination({ take, skip });

    const { users, totalUsers } = await this.usecase.execute({
      filters,
      orderBy,
      pagination,
    });

    const usersDTOs = users.map((user) => UserTransformer.generateDTO(user));

    return {
      items: usersDTOs,
      totalItems: totalUsers,
      totalItemsListed: usersDTOs.length,
    };
  }
}
