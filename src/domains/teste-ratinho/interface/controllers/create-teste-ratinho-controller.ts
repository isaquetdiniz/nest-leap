import { Validation } from '@/shared/interface/validation/protocols';
import {
  TesteRatinhoDTO,
  CreateTesteRatinhoUsecase,
  IGetTesteRatinhoByNameRepository,
  ISaveTesteRatinhoRepository,
  TesteRatinhoTransformer,
} from '@/domains/teste-ratinho';
import { ValidationException } from '@/shared/helpers';
import { IUuidGenerator } from '@/shared/protocols';

export interface CreateTesteRatinhoRequest {
  name: string;
}

export type CreateTesteRatinhoResponse = TesteRatinhoDTO;

export class CreateTesteRatinhoController {
  private usecase: CreateTesteRatinhoUsecase;

  constructor(
    getTesteRatinhoByNameRepository: IGetTesteRatinhoByNameRepository,
    uuidGenerator: IUuidGenerator,
    saveTesteRatinhoRepository: ISaveTesteRatinhoRepository,
    private readonly validation: Validation
  ) {
    this.usecase = new CreateTesteRatinhoUsecase(
      getTesteRatinhoByNameRepository,
      uuidGenerator,
      saveTesteRatinhoRepository
    );
  }

  async execute(
    request: CreateTesteRatinhoRequest
  ): Promise<CreateTesteRatinhoResponse> {
    const { name } = request;

    const hasError = this.validation.validate({
      name,
    });

    if (hasError) {
      throw new ValidationException(hasError);
    }

    const testeRatinhoCreated = await this.usecase.execute({ name });

    const testeRatinhoCreatedDTO =
      TesteRatinhoTransformer.generateDTO(testeRatinhoCreated);

    return testeRatinhoCreatedDTO;
  }
}
