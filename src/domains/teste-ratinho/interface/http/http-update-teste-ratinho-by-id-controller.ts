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
import { ILoggerLocal } from '@/shared/protocols';

export interface HttpUpdateTesteRatinhoByIdRequest {
  id: string;
  name?: string;
  enabled?: boolean;
}

export class HttpUpdateTesteRatinhoByIdController implements HttpController {
  private controller: UpdateTesteRatinhoByIdController;
  private logger: ILoggerLocal;

  constructor(
    getTesteRatinhoByIdRepository: IGetTesteRatinhoByIdRepository,
    updateTesteRatinhoRepository: IUpdateTesteRatinhoRepository,
    validation: Validation,
    logger: ILoggerLocal
  ) {
    this.controller = new UpdateTesteRatinhoByIdController(
      getTesteRatinhoByIdRepository,
      updateTesteRatinhoRepository,
      validation,
      logger
    );

    this.logger = logger.child({
      httpController: 'update-teste-ratinho-by-id',
    });
  }

  async handle(
    httpRequest: HttpUpdateTesteRatinhoByIdRequest
  ): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest });

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

      this.logger.logDebug({
        message: 'TesteRatinho updated',
        data: testeRatinhoUpdated,
      });

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
