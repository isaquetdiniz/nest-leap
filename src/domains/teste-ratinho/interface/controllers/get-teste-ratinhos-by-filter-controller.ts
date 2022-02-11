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
  Pagination,
  ValidationException,
} from '@/shared/helpers';
import { convertProperties } from '@/shared/helpers/query-converter-helper';

export interface GetTesteRatinhosByFilterRequest {
  name?: string;
  enabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
  property?: string;
  mode?: string;
  take?: string;
  skip?: string;
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
    const filterParams = convertProperties(request);

    const hasErrors = this.validation.validate(filterParams);

    if (hasErrors) {
      throw new ValidationException(hasErrors);
    }

    const { orderBy: orderByDTO, take, skip, name, enabled } = filterParams;

    const filters = {
      name,
      enabled,
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
