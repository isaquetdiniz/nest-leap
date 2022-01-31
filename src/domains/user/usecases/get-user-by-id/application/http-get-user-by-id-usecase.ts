import { badRequest, ok, serverError } from '@/application/http-server/helpers';
import {
  HttpController,
  HttpResponse,
} from '@/application/http-server/protocols';
import { Validation } from '@/application/validation/protocols';
import {
  GetUserByIdController,
  IGetUserByEmailInCloudRepository,
  IGetUserByIdRepository,
} from '@/domains/user';
import { ValidationException } from '@/shared/helpers';

export interface HttpGetUserByIdRequest {
  id: string;
}

export class HttpGetUserByIdUsecase implements HttpController {
  private controller: GetUserByIdController;

  constructor(
    getUserByIdRepository: IGetUserByIdRepository,
    getUserByEmailInCloudRepository: IGetUserByEmailInCloudRepository,
    validation: Validation
  ) {
    this.controller = new GetUserByIdController(
      getUserByIdRepository,
      getUserByEmailInCloudRepository,
      validation
    );
  }

  async handle(httpRequest: HttpGetUserByIdRequest): Promise<HttpResponse> {
    const { id } = httpRequest;

    try {
      const user = await this.controller.execute({ id });

      return ok(user);
    } catch (error) {
      if (error instanceof ValidationException) {
        return badRequest(error);
      }

      return serverError(error as Error);
    }
  }
}
