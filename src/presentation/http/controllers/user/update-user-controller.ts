import { Controller, HttpResponse } from '@/presentation/http/protocols';

import {
  badRequest,
  conflict,
  serverError,
  updated,
} from '@/presentation/http/helpers/http-helper';

import { Validation } from '@/presentation/validation/protocols';
import { UpdateUserUsecase } from '@/domain/user/usecases/user';
import { UpdateUserInDatabaseRepositoryError } from '@/application/errors/repositories/user';
import { UpdateUserInDatabaseServiceError } from '@/application/errors/services/user';

export class UpdateUserController implements Controller {
  private readonly validation: Validation;
  private readonly updateUserUsecase: UpdateUserUsecase;

  constructor(validation: Validation, updateUserUsecase: UpdateUserUsecase) {
    this.validation = validation;
    this.updateUserUsecase = updateUserUsecase;
  }

  async handle(
    httpRequest: UpdateUserController.Request
  ): Promise<HttpResponse> {
    try {
      const hasError = this.validation.validate(httpRequest);

      if (hasError) return badRequest(hasError);

      const userUpdated = await this.updateUserUsecase.update(httpRequest);

      return updated(userUpdated);
    } catch (error) {
      const catchedError = error as Error;

      if (
        error instanceof UpdateUserInDatabaseServiceError ||
        error instanceof UpdateUserInDatabaseRepositoryError
      ) {
        return conflict(catchedError);
      }

      return serverError(catchedError);
    }
  }
}

export namespace UpdateUserController {
  export type Request = UpdateUserUsecase.Params;
}
