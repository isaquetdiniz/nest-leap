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
import { ILoggerLocal } from '@/shared/protocols';

export interface HttpDeleteTesteRatinhoByIdRequest {
  id: string;
}

export class HttpDeleteTesteRatinhoByIdController implements HttpController {
  private controller: DeleteTesteRatinhoByIdController;
  private logger: ILoggerLocal;

  constructor(
    getTesteRatinhoByIdRepository: IGetTesteRatinhoByIdRepository,
    deleteTesteRatinhoByIdRepository: IDeleteTesteRatinhoByIdRepository,
    validation: Validation,
    logger: ILoggerLocal
  ) {
    this.controller = new DeleteTesteRatinhoByIdController(
      getTesteRatinhoByIdRepository,
      deleteTesteRatinhoByIdRepository,
      validation,
      logger
    );

    this.logger = logger.child({
      httpController: 'delete-teste-ratinho-by-id',
    });
  }

  async handle(
    httpRequest: HttpDeleteTesteRatinhoByIdRequest
  ): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest });

    const { id } = httpRequest;

    try {
      await this.controller.execute({ id });

      this.logger.logDebug({ message: 'TesteRatinho deleted', data: { id } });

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
