import { Validation } from '@/shared/interface/validation/protocols';
import {
  IGetTesteRatinhoByIdRepository,
  IUpdateTesteRatinhoRepository,
  UpdateTesteRatinhoByIdUsecase,
  TesteRatinhoDTO,
  TesteRatinhoTransformer,
} from '@/domains/teste-ratinho';
import { ValidationException } from '@/shared/helpers';

export interface UpdateTesteRatinhoByIdRequest {
  id: string;
  paramsToUpdate: {
    name?: string;
    enabled?: boolean;
  };
}

export type UpdateTesteRatinhoByIdResponse = TesteRatinhoDTO;

export class UpdateTesteRatinhoByIdController {
  private usecase: UpdateTesteRatinhoByIdUsecase;

  constructor(
    getTesteRatinhoByIdRepository: IGetTesteRatinhoByIdRepository,
    updateTesteRatinhoRepository: IUpdateTesteRatinhoRepository,
    private readonly validation: Validation
  ) {
    this.usecase = new UpdateTesteRatinhoByIdUsecase(
      getTesteRatinhoByIdRepository,
      updateTesteRatinhoRepository
    );
  }

  async execute(
    request: UpdateTesteRatinhoByIdRequest
  ): Promise<UpdateTesteRatinhoByIdResponse> {
    const { id, paramsToUpdate } = request;

    const { name, enabled } = paramsToUpdate;

    const hasErrors = this.validation.validate({
      id,
      name,
      enabled,
    });

    if (hasErrors) {
      throw new ValidationException(hasErrors);
    }

    const testeRatinhoUpdated = await this.usecase.execute({
      id,
      paramsToUpdate,
    });

    const testeRatinhoUpdatedDTO =
      TesteRatinhoTransformer.generateDTO(testeRatinhoUpdated);

    return testeRatinhoUpdatedDTO;
  }
}
