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

  constructor(
    getUsersByFilterRepository: IGetUsersByFilterRepository,
    countUsersByFilterRepository: ICountUsersByFilterRepository,
    validation: Validation
  ) {
    this.controller = new GetUsersByFilterController(
      getUsersByFilterRepository,
      countUsersByFilterRepository,
      validation
    );
  }

  async handle(
    httpRequest: HttpGetUsersByFilterRequest
  ): Promise<HttpResponse> {
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

      return ok(users);
    } catch (error) {
      if (error instanceof ValidationException) {
        return badRequest(error);
      }

      return serverError(error as Error);
    }
  }
}
