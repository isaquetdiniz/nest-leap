import { Controller, HttpResponse } from '@/presentation/http/protocols';

import {
  badRequest,
  conflict,
  created,
  serverError,
} from '@/presentation/http/helpers/http-helper';

import { Validation } from '@/presentation/validation/protocols';
import { CreateUserUsecase } from '@/domain/usecases/user';
import { CreateUserInDatabaseRepositoryError } from '@/application/errors/repositories/user';
import { CreateUserInDatabaseServiceError } from '@/application/errors/services/user';
import { CreateUserInCloudProviderError } from '@/application/errors/cloud/user';

export class CreateUserController implements Controller {
  private readonly validation: Validation;
  private readonly createUserUsecase: CreateUserUsecase;

  constructor(validation: Validation, createUserUsecase: CreateUserUsecase) {
    this.validation = validation;
    this.createUserUsecase = createUserUsecase;
  }

  async handle(
    httpRequest: CreateUserController.Request
  ): Promise<HttpResponse> {
    try {
      const hasError = this.validation.validate(httpRequest);

      if (hasError) return badRequest(hasError);

      const newUser = await this.createUserUsecase.create(httpRequest);

      return created(newUser);
    } catch (error) {
      const catchedError = error as Error;

      if (
        error instanceof CreateUserInDatabaseRepositoryError ||
        error instanceof CreateUserInDatabaseServiceError ||
        error instanceof CreateUserInCloudProviderError
      ) {
        return conflict(catchedError);
      }

      return serverError(catchedError);
    }
  }
}

export namespace CreateUserController {
  export type Request = CreateUserUsecase.Params;
}
