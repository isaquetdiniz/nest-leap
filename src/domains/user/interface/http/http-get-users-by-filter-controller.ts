import { badRequest, ok, serverError } from '@/shared/interface/http/helpers';
import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import { Validation } from '@/shared/interface/validation/protocols';
import {
  GetUsersByFilterController,
  IGetUsersByFilterRepository,
  ICountUsersByFilterRepository,
} from '@/domains/user';
import { DateFilter, OrderByMode, ValidationException } from '@/shared/helpers';
import { ILoggerLocal } from '@/shared/protocols';
import { CognitoException } from '@/shared/infra/cognito';

export type HttpGetUsersByFilterRequest = {
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
};

export class HttpGetUsersByFilterController implements HttpController {
  private controller: GetUsersByFilterController;
  private logger: ILoggerLocal;

  constructor(
    getUsersByFilterRepository: IGetUsersByFilterRepository,
    countUsersByFilterRepository: ICountUsersByFilterRepository,
    validation: Validation,
    logger: ILoggerLocal
  ) {
    this.controller = new GetUsersByFilterController(
      getUsersByFilterRepository,
      countUsersByFilterRepository,
      validation,
      logger
    );

    this.logger = logger.child({ httpController: 'get-users-by-filter' });
  }

  async handle(
    httpRequest: HttpGetUsersByFilterRequest
  ): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest });

    const {
      name,
      email,
      isAdmin,
      enabled,
      createdAt,
      updatedAt,
      orderBy,
      take,
      skip,
    } = httpRequest;

    try {
      const users = await this.controller.execute({
        name,
        email,
        isAdmin,
        enabled,
        createdAt,
        updatedAt,
        orderBy,
        take,
        skip,
      });

      this.logger.logDebug({ message: 'Users found' });

      return ok(users);
    } catch (error) {
      if (
        error instanceof ValidationException ||
        error instanceof CognitoException
      ) {
        return badRequest(error);
      }

      return serverError(error as Error);
    }
  }
}
