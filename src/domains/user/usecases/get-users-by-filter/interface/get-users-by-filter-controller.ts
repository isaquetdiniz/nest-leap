import { Validation } from '@/application/validation/protocols';
import {
  UserDTO,
  UserTransformer,
  GetUsersByFilterUsecase,
  IGetUsersByFilterRepository,
  ICountUsersByFilterRepository,
} from '@/domains/user';
import {
  OrderByFilter,
  Pagination,
  ValidationException,
} from '@/shared/helpers';
import { convertProperties } from '@/shared/helpers/query-converter-helper';

export interface GetUsersByFilterRequest {
  name?: string;
  email?: string;
  isAdmin?: boolean;
  enabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
  property?: string;
  mode?: string;
  take?: string;
  skip?: string;
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
    const filterParams = convertProperties(request);

    const hasErrors = this.validation.validate(filterParams);

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
    } = filterParams;

    const filters = {
      name,
      email,
      isAdmin,
      enabled,
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
