import { Validation } from '@/shared/interface/validation/protocols';
import {
  TesteRatinhoDTO,
  GetTesteRatinhoByIdUsecase,
  IGetTesteRatinhoByIdRepository,
  TesteRatinhoTransformer,
} from '@/domains/teste-ratinho';
import { ValidationException } from '@/shared/helpers';
import { ILoggerLocal } from '@/shared/protocols';

export interface GetTesteRatinhoByIdRequest {
  id: string;
}

export type GetTesteRatinhoByIdResponse = {
  testeRatinho: TesteRatinhoDTO;
} | null;

export class GetTesteRatinhoByIdController {
  private usecase: GetTesteRatinhoByIdUsecase;
  private logger: ILoggerLocal;

  constructor(
    getTesteRatinhoByIdRepository: IGetTesteRatinhoByIdRepository,
    private readonly validation: Validation,
    logger: ILoggerLocal
  ) {
    this.usecase = new GetTesteRatinhoByIdUsecase(
      getTesteRatinhoByIdRepository,
      logger
    );

    this.logger = logger.child({ controller: 'get-teste-ratinho-by-id' });
  }

  async execute(
    request: GetTesteRatinhoByIdRequest
  ): Promise<GetTesteRatinhoByIdResponse> {
    this.logger.logDebug({ message: 'Request received', data: request });

    const { id } = request;

    const hasErrors = this.validation.validate(request);

    if (hasErrors) {
      throw new ValidationException(hasErrors);
    }

    this.logger.logDebug({ message: 'Params validated' });

    const testeRatinho = await this.usecase.execute(id);

    this.logger.logDebug({ message: 'TesteRatinho found', data: testeRatinho });

    if (!testeRatinho) {
      return null;
    }

    const testeRatinhoDTO = TesteRatinhoTransformer.generateDTO(testeRatinho);

    return { testeRatinho: testeRatinhoDTO };
  }
}
