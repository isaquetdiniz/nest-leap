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
import { ILoggerLocal } from '@/shared/protocols';

export interface HttpGetTesteRatinhoByIdRequest {
  id: string;
}

export class HttpGetTesteRatinhoByIdController implements HttpController {
  private controller: GetTesteRatinhoByIdController;
  private logger: ILoggerLocal;

  constructor(
    getTesteRatinhoByIdRepository: IGetTesteRatinhoByIdRepository,
    validation: Validation,
    logger: ILoggerLocal
  ) {
    this.controller = new GetTesteRatinhoByIdController(
      getTesteRatinhoByIdRepository,
      validation,
      logger
    );

    this.logger = logger.child({ httpController: 'get-TesteRatinho-by-id' });
  }

  async handle(
    httpRequest: HttpGetTesteRatinhoByIdRequest
  ): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest });

    const { id } = httpRequest;

    try {
      const testeRatinho = await this.controller.execute({ id });

      this.logger.logDebug({
        message: 'TesteRatinho found',
        data: testeRatinho,
      });

      return ok(testeRatinho);
    } catch (error) {
      if (error instanceof ValidationException) {
        return badRequest(error);
      }

      return serverError(error as Error);
    }
  }
}
