import { Controller, HttpResponse } from '@/presentation/http/protocols';

import {
  badRequest,
  conflict,
  ok,
  serverError,
} from '@/presentation/http/helpers/http-helper';

import { Validation } from '@/presentation/validation/protocols';
import { ListUsersUsecase } from '@/domain/usecases/user';
import {
  CountUsersInDatabaseRepositoryError,
  ListUsersInDatabaseRepositoryError,
} from '@/application/errors/repositories/user';

export class ListUsersController implements Controller {
  private readonly validation: Validation;
  private readonly listUsersUsecase: ListUsersUsecase;

  constructor(validation: Validation, listUsersUsecase: ListUsersUsecase) {
    this.validation = validation;
    this.listUsersUsecase = listUsersUsecase;
  }

  async handle(
    httpRequest: ListUsersController.Request
  ): Promise<HttpResponse> {
    try {
      const hasError = this.validation.validate(httpRequest);

      if (hasError) return badRequest(hasError);

      const { users, totalUsers } = await this.listUsersUsecase.list(
        httpRequest
      );

      return ok({ users, totalUsers }, 'list');
    } catch (error) {
      const catchedError = error as Error;

      if (
        error instanceof ListUsersInDatabaseRepositoryError ||
        error instanceof CountUsersInDatabaseRepositoryError
      ) {
        return conflict(catchedError);
      }

      return serverError(catchedError);
    }
  }
}

export namespace ListUsersController {
  export type Request = ListUsersUsecase.Params;
}
