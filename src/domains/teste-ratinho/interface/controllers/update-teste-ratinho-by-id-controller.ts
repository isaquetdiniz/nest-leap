import { Validation } from '@/shared/interface/validation/protocols';
import {
  IGetTesteRatinhoByIdRepository,
  IUpdateTesteRatinhoRepository,
  UpdateTesteRatinhoByIdUsecase,
  TesteRatinhoDTO,
  TesteRatinhoTransformer,
} from '@/domains/teste-ratinho';
import { ValidationException } from '@/shared/helpers';
import { ILoggerLocal } from '@/shared/protocols';

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
  private logger: ILoggerLocal;

  constructor(
    getTesteRatinhoByIdRepository: IGetTesteRatinhoByIdRepository,
    updateTesteRatinhoRepository: IUpdateTesteRatinhoRepository,
    private readonly validation: Validation,
    logger: ILoggerLocal
  ) {
    this.usecase = new UpdateTesteRatinhoByIdUsecase(
      getTesteRatinhoByIdRepository,
      updateTesteRatinhoRepository,
      logger
    );

    this.logger = logger.child({ controller: 'update-teste-ratinho-by-id' });
  }

  async execute(
    request: UpdateTesteRatinhoByIdRequest
  ): Promise<UpdateTesteRatinhoByIdResponse> {
    this.logger.logDebug({ message: 'Request received', data: request });

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

    this.logger.logDebug({ message: 'Params validated' });

    const testeRatinhoUpdated = await this.usecase.execute({
      id,
      paramsToUpdate,
    });

    const testeRatinhoUpdatedDTO =
      TesteRatinhoTransformer.generateDTO(testeRatinhoUpdated);

    this.logger.logDebug({
      message: 'TesteRatinho updated',
      data: testeRatinhoUpdatedDTO,
    });

    return testeRatinhoUpdatedDTO;
  }
}
