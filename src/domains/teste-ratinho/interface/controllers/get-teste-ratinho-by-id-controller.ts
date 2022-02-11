import { Validation } from '@/shared/interface/validation/protocols';
import {
  TesteRatinhoDTO,
  GetTesteRatinhoByIdUsecase,
  IGetTesteRatinhoByIdRepository,
  TesteRatinhoTransformer,
} from '@/domains/teste-ratinho';
import { ValidationException } from '@/shared/helpers';

export interface GetTesteRatinhoByIdRequest {
  id: string;
}

export type GetTesteRatinhoByIdResponse = {
  testeRatinho: TesteRatinhoDTO;
} | null;

export class GetTesteRatinhoByIdController {
  private usecase: GetTesteRatinhoByIdUsecase;

  constructor(
    getTesteRatinhoByIdRepository: IGetTesteRatinhoByIdRepository,
    private readonly validation: Validation
  ) {
    this.usecase = new GetTesteRatinhoByIdUsecase(
      getTesteRatinhoByIdRepository
    );
  }

  async execute(
    request: GetTesteRatinhoByIdRequest
  ): Promise<GetTesteRatinhoByIdResponse> {
    const { id } = request;

    const hasErrors = this.validation.validate(request);

    if (hasErrors) {
      throw new ValidationException(hasErrors);
    }

    const testeRatinho = await this.usecase.execute(id);

    if (!testeRatinho) {
      return null;
    }

    const testeRatinhoDTO = TesteRatinhoTransformer.generateDTO(testeRatinho);

    return { testeRatinho: testeRatinhoDTO };
  }
}
