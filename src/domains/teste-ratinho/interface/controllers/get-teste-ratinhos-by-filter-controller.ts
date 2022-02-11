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

  constructor(
    getTesteRatinhosByFilterRepository: IGetTesteRatinhosByFilterRepository,
    countTesteRatinhosByFilterRepository: ICountTesteRatinhosByFilterRepository,
    private readonly validation: Validation
  ) {
    this.usecase = new GetTesteRatinhosByFilterUsecase(
      getTesteRatinhosByFilterRepository,
      countTesteRatinhosByFilterRepository
    );
  }

  async execute(
    request: GetTesteRatinhosByFilterRequest
  ): Promise<GetTesteRatinhosByFilterResponse> {
    const hasErrors = this.validation.validate(request);

    if (hasErrors) {
      throw new ValidationException(hasErrors);
    }

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

    return {
      items: testeRatinhosDTOs,
      totalItems: totalTesteRatinhos,
      totalItemsListed: testeRatinhosDTOs.length,
    };
  }
}
