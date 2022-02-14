import { badRequest, ok, serverError } from '@/shared/interface/http/helpers';
import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import { Validation } from '@/shared/interface/validation/protocols';
import {
  GetTesteRatinhosByFilterController,
  IGetTesteRatinhosByFilterRepository,
  ICountTesteRatinhosByFilterRepository,
} from '@/domains/teste-ratinho';
import { DateFilter, OrderByMode, ValidationException } from '@/shared/helpers';
import { ILoggerLocal } from '@/shared/protocols';

export type HttpGetTesteRatinhosByFilterRequest = {
  name?: string;
  enabled?: boolean;
  createdAt?: DateFilter;
  updatedAt?: DateFilter;
  orderBy: {
    property?: string;
    mode?: OrderByMode;
  };
  take?: number;
  skip?: number;
  count?: boolean;
};

export class HttpGetTesteRatinhosByFilterController implements HttpController {
  private controller: GetTesteRatinhosByFilterController;
  private logger: ILoggerLocal;

  constructor(
    getTesteRatinhosByFilterRepository: IGetTesteRatinhosByFilterRepository,
    countTesteRatinhosByFilterRepository: ICountTesteRatinhosByFilterRepository,
    validation: Validation,
    logger: ILoggerLocal
  ) {
    this.controller = new GetTesteRatinhosByFilterController(
      getTesteRatinhosByFilterRepository,
      countTesteRatinhosByFilterRepository,
      validation,
      logger
    );

    this.logger = logger.child({
      httpController: 'get-teste-ratinhos-by-filter',
    });
  }

  async handle(
    httpRequest: HttpGetTesteRatinhosByFilterRequest
  ): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest });

    const { name, enabled, createdAt, updatedAt, orderBy, take, skip, count } =
      httpRequest;

    try {
      const testeRatinhos = await this.controller.execute({
        name,
        enabled,
        createdAt,
        updatedAt,
        orderBy,
        take,
        skip,
        count,
      });

      this.logger.logDebug({ message: 'TesteRatinhos found' });

      return ok(testeRatinhos);
    } catch (error) {
      if (error instanceof ValidationException) {
        return badRequest(error);
      }

      return serverError(error as Error);
    }
  }
}
