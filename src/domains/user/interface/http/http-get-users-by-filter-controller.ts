import { badRequest, ok, serverError } from '@/application/http-server/helpers';
import {
  HttpController,
  HttpResponse,
} from '@/application/http-server/protocols';
import { Validation } from '@/shared/interface/validation/protocols';
import {
  GetUsersByFilterController,
  IGetUsersByFilterRepository,
  ICountUsersByFilterRepository,
  GetUsersByFilterRequest,
} from '@/domains/user';
import { ValidationException } from '@/shared/helpers';

export type HttpGetUsersByFilterRequest = GetUsersByFilterRequest;

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
      property,
      mode,
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
        property,
        mode,
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
