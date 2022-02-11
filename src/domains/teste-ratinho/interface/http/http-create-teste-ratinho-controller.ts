import {
  CreateTesteRatinhoController,
  IGetTesteRatinhoByNameRepository,
  ISaveTesteRatinhoRepository,
  TesteRatinhoAlreadyExistsException,
} from '@/domains/teste-ratinho';
import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import { Validation } from '@/shared/interface/validation/protocols';
import { badRequest, ok, serverError } from '@/shared/interface/http/helpers';
import { ValidationException } from '@/shared/helpers';
import { ILoggerLocal, IUuidGenerator } from '@/shared/protocols';

export interface HttpCreateTesteRatinhoRequest {
  name: string;
}

export class HttpCreateTesteRatinhoController implements HttpController {
  private controller: CreateTesteRatinhoController;
  private logger: ILoggerLocal;

  constructor(
    getTesteRatinhoByNameRepository: IGetTesteRatinhoByNameRepository,
    uuidGenerator: IUuidGenerator,
    saveTesteRatinhoRepository: ISaveTesteRatinhoRepository,
    validation: Validation,
    logger: ILoggerLocal
  ) {
    this.controller = new CreateTesteRatinhoController(
      getTesteRatinhoByNameRepository,
      uuidGenerator,
      saveTesteRatinhoRepository,
      validation,
      logger
    );

    this.logger = logger.child({ httpController: 'create-teste-ratinho' });
  }

  async handle(
    httpRequest: HttpCreateTesteRatinhoRequest
  ): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest });

    const { name } = httpRequest;

    try {
      const testeRatinhoCreated = await this.controller.execute({
        name,
      });

      this.logger.logDebug({
        message: 'TesteRatinho created',
        data: testeRatinhoCreated,
      });

      return ok(testeRatinhoCreated);
    } catch (error) {
      if (error instanceof ValidationException) {
        return badRequest(error);
      }

      if (error instanceof TesteRatinhoAlreadyExistsException) {
        return badRequest(error);
      }

      return serverError(error as Error);
    }
  }
}
