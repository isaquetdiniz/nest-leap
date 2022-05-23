/* eslint-disable camelcase */
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

export type HttpGetUsersByFilterRequest = {
  name?: string;
  email?: string;
  is_admin?: boolean;
  enabled?: boolean;
  created_at?: DateFilter;
  updated_at?: DateFilter;
  order_by: {
    property?: string;
    mode?: OrderByMode;
  };
  take?: number;
  skip?: number;
  count?: boolean;
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
      is_admin,
      enabled,
      created_at,
      updated_at,
      order_by,
      take,
      skip,
      count,
    } = httpRequest;
    console.log('=====ADMIN=====', httpRequest.is_admin);
    console.log('=====ADMIN=====', typeof httpRequest.is_admin);

    try {
      const users = await this.controller.execute({
        name,
        email,
        is_admin,
        enabled,
        created_at,
        updated_at,
        order_by,
        take,
        skip,
        count,
      });

      this.logger.logDebug({ message: 'Users found' });

      return ok(users);
    } catch (error) {
      if (error instanceof ValidationException) {
        return badRequest(error);
      }

      return serverError(error as Error);
    }
  }
}
