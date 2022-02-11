import {
  badRequest,
  notFound,
  ok,
  serverError,
} from '@/shared/interface/http/helpers';
import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import { Validation } from '@/shared/interface/validation/protocols';
import {
  IGetTesteRatinhoByIdRepository,
  IUpdateTesteRatinhoRepository,
  UpdateTesteRatinhoByIdController,
  TesteRatinhoNotFoundException,
} from '@/domains/teste-ratinho';
import { ValidationException } from '@/shared/helpers';

export interface HttpUpdateTesteRatinhoByIdRequest {
  id: string;
  name?: string;
  enabled?: boolean;
}

export class HttpUpdateTesteRatinhoByIdController implements HttpController {
  private controller: UpdateTesteRatinhoByIdController;

  constructor(
    getTesteRatinhoByIdRepository: IGetTesteRatinhoByIdRepository,
    updateTesteRatinhoRepository: IUpdateTesteRatinhoRepository,
    validation: Validation
  ) {
    this.controller = new UpdateTesteRatinhoByIdController(
      getTesteRatinhoByIdRepository,
      updateTesteRatinhoRepository,
      validation
    );
  }

  async handle(
    httpRequest: HttpUpdateTesteRatinhoByIdRequest
  ): Promise<HttpResponse> {
    const { id, name, enabled } = httpRequest;

    const request = {
      id,
      paramsToUpdate: {
        name,
        enabled,
      },
    };

    try {
      const testeRatinhoUpdated = await this.controller.execute(request);

      return ok(testeRatinhoUpdated);
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
