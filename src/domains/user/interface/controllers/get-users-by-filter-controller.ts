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
import { ILoggerLocal } from '@/shared/protocols';

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
  private logger: ILoggerLocal;

  constructor(
    getUsersByFilterRepository: IGetUsersByFilterRepository,
    countUsersByFilterRepository: ICountUsersByFilterRepository,
    private readonly validation: Validation,
    logger: ILoggerLocal
  ) {
    this.usecase = new GetUsersByFilterUsecase(
      getUsersByFilterRepository,
      countUsersByFilterRepository,
      logger
    );

    this.logger = logger.child({ controller: 'get-users-by-filter' });
  }

  async execute(
    request: GetUsersByFilterRequest
  ): Promise<GetUsersByFilterResponse> {
    this.logger.logDebug({ message: 'Request received', data: request });

    const hasErrors = this.validation.validate(request);

    if (hasErrors) {
      throw new ValidationException(hasErrors);
    }

    this.logger.logDebug({ message: 'Params validated' });

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

    this.logger.logDebug({
      message: 'Users found',
      data: { totalUsers, totalItemsListed: usersDTOs.length },
    });

    return {
      items: usersDTOs,
      totalItems: totalUsers,
      totalItemsListed: usersDTOs.length,
    };
  }
}
