import { badRequest, ok, serverError } from '@/shared/interface/http/helpers';
import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import { Validation } from '@/shared/interface/validation/protocols';
import {
  GetTesteRatinhoByIdController,
  IGetTesteRatinhoByIdRepository,
} from '@/domains/teste-ratinho';
import { ValidationException } from '@/shared/helpers';

export interface HttpGetTesteRatinhoByIdRequest {
  id: string;
}

export class HttpGetTesteRatinhoByIdController implements HttpController {
  private controller: GetTesteRatinhoByIdController;

  constructor(
    getTesteRatinhoByIdRepository: IGetTesteRatinhoByIdRepository,
    validation: Validation
  ) {
    this.controller = new GetTesteRatinhoByIdController(
      getTesteRatinhoByIdRepository,
      validation
    );
  }

  async handle(
    httpRequest: HttpGetTesteRatinhoByIdRequest
  ): Promise<HttpResponse> {
    const { id } = httpRequest;

    try {
      const testeRatinho = await this.controller.execute({ id });

      return ok(testeRatinho);
    } catch (error) {
      if (error instanceof ValidationException) {
        return badRequest(error);
      }

      return serverError(error as Error);
    }
  }
}
