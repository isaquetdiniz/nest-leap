import { Controller, HttpResponse } from '@/presentation/http/protocols';

import {
  badRequest,
  conflict,
  ok,
  serverError,
} from '@/presentation/http/helpers/http-helper';

import { Validation } from '@/presentation/validation/protocols';
import { DeleteUserUsecase } from '@/domain/user/usecases/user';
import { DeleteUserInDatabaseRepositoryError } from '@/application/errors/repositories/user';
import { DeleteUserInDatabaseServiceError } from '@/application/errors/services/user';

export class DeleteUserController implements Controller {
  private readonly validation: Validation;
  private readonly deleteUserUsecase: DeleteUserUsecase;

  constructor(validation: Validation, deleteUserUsecase: DeleteUserUsecase) {
    this.validation = validation;
    this.deleteUserUsecase = deleteUserUsecase;
  }

  async handle(
    httpRequest: DeleteUserController.Request
  ): Promise<HttpResponse> {
    try {
      const hasError = this.validation.validate(httpRequest);

      if (hasError) return badRequest(hasError);

      await this.deleteUserUsecase.delete(httpRequest);

      return ok();
    } catch (error) {
      const catchedError = error as Error;

      if (
        error instanceof DeleteUserInDatabaseServiceError ||
        error instanceof DeleteUserInDatabaseRepositoryError
      ) {
        return conflict(catchedError);
      }

      return serverError(catchedError);
    }
  }
}

export namespace DeleteUserController {
  export type Request = DeleteUserUsecase.Params;
}
