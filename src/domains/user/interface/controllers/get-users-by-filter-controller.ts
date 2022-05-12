import { Validation } from '@/shared/interface/validation/protocols';
import {
  User,
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
  count?: boolean;
}

export type GetUsersByFilterResponse =
  | {
      items: User[];
      totalItemsListed: number;
      totalItems: number;
    }
  | { totalItems: number };

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
      orderBy: orderByFilter,
      take,
      skip,
      name,
      email,
      isAdmin,
      enabled,
      createdAt,
      updatedAt,
      count,
    } = request;

    const filters = {
      name,
      email,
      isAdmin,
      enabled,
      createdAt,
      updatedAt,
    };

    const orderBy = new OrderByFilter(orderByFilter);
    const pagination = new Pagination({ take, skip });

    const { users, totalUsers } = await this.usecase.execute({
      filters,
      orderBy,
      pagination,
      count,
    });

    this.logger.logDebug({
      message: 'Users found',
      data: { totalUsers, totalItemsListed: users?.length },
    });

    if (count) {
      return {
        totalItems: totalUsers,
      };
    }

    return {
      items: users,
      totalItems: totalUsers,
      totalItemsListed: users?.length,
    };
  }
}
