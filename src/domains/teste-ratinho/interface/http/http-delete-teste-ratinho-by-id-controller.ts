import {
  DeleteTesteRatinhoByIdController,
  IDeleteTesteRatinhoByIdRepository,
  IGetTesteRatinhoByIdRepository,
  TesteRatinhoNotFoundException,
} from '@/domains/teste-ratinho';
import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import { Validation } from '@/shared/interface/validation/protocols';
import {
  badRequest,
  notFound,
  ok,
  serverError,
} from '@/shared/interface/http/helpers';
import { ValidationException } from '@/shared/helpers';

export interface HttpDeleteTesteRatinhoByIdRequest {
  id: string;
}

export class HttpDeleteTesteRatinhoByIdController implements HttpController {
  private controller: DeleteTesteRatinhoByIdController;

  constructor(
    getTesteRatinhoByIdRepository: IGetTesteRatinhoByIdRepository,
    deleteTesteRatinhoByIdRepository: IDeleteTesteRatinhoByIdRepository,
    validation: Validation
  ) {
    this.controller = new DeleteTesteRatinhoByIdController(
      getTesteRatinhoByIdRepository,
      deleteTesteRatinhoByIdRepository,
      validation
    );
  }

  async handle(
    httpRequest: HttpDeleteTesteRatinhoByIdRequest
  ): Promise<HttpResponse> {
    const { id } = httpRequest;

    try {
      await this.controller.execute({ id });

      return ok();
    } catch (error) {
      if (error instanceof ValidationException) {
        return badRequest(error);
      }

      if (error instanceof TesteRatinhoNotFoundException) {
        return notFound(error);
      }

      return serverError(error as Error);
    }
  }
}
