import { Validation } from '@/shared/interface/validation/protocols';
import {
  TesteRatinhoDTO,
  TesteRatinhoTransformer,
  GetTesteRatinhosByFilterUsecase,
  IGetTesteRatinhosByFilterRepository,
  ICountTesteRatinhosByFilterRepository,
} from '@/domains/teste-ratinho';
import {
  OrderByFilter,
  OrderByMode,
  DateFilter,
  Pagination,
  ValidationException,
} from '@/shared/helpers';
import { ILoggerLocal } from '@/shared/protocols';

export interface GetTesteRatinhosByFilterRequest {
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
}

export interface GetTesteRatinhosByFilterResponse {
  items: TesteRatinhoDTO[];
  totalItemsListed: number;
  totalItems: number;
}

export class GetTesteRatinhosByFilterController {
  private usecase: GetTesteRatinhosByFilterUsecase;
  private logger: ILoggerLocal;

  constructor(
    getTesteRatinhosByFilterRepository: IGetTesteRatinhosByFilterRepository,
    countTesteRatinhosByFilterRepository: ICountTesteRatinhosByFilterRepository,
    private readonly validation: Validation,
    logger: ILoggerLocal
  ) {
    this.usecase = new GetTesteRatinhosByFilterUsecase(
      getTesteRatinhosByFilterRepository,
      countTesteRatinhosByFilterRepository,
      logger
    );

    this.logger = logger.child({ controller: 'get-teste-ratinhos-by-filter' });
  }

  async execute(
    request: GetTesteRatinhosByFilterRequest
  ): Promise<GetTesteRatinhosByFilterResponse> {
    this.logger.logDebug({ message: 'Request received', data: request });

    const hasErrors = this.validation.validate(request);

    if (hasErrors) {
      throw new ValidationException(hasErrors);
    }

    this.logger.logDebug({ message: 'Params validated' });

    const {
      orderBy: orderByDTO,
      take,
      skip,
      name,
      enabled,
      createdAt,
      updatedAt,
    } = request;

    const filters = {
      name,
      enabled,
      createdAt,
      updatedAt,
    };

    const orderBy = new OrderByFilter(orderByDTO);
    const pagination = new Pagination({ take, skip });

    const { testeRatinhos, totalTesteRatinhos } = await this.usecase.execute({
      filters,
      orderBy,
      pagination,
    });

    const testeRatinhosDTOs = testeRatinhos.map((testeRatinho) =>
      TesteRatinhoTransformer.generateDTO(testeRatinho)
    );

    this.logger.logDebug({
      message: 'TesteRatinhos found',
      data: { totalTesteRatinhos, totalItemsListed: testeRatinhosDTOs.length },
    });

    return {
      items: testeRatinhosDTOs,
      totalItems: totalTesteRatinhos,
      totalItemsListed: testeRatinhosDTOs.length,
    };
  }
}
