import { Validation } from '@/shared/interface/validation/protocols';
import {
  TesteRatinhoDTO,
  CreateTesteRatinhoUsecase,
  IGetTesteRatinhoByNameRepository,
  ISaveTesteRatinhoRepository,
  TesteRatinhoTransformer,
} from '@/domains/teste-ratinho';
import { ValidationException } from '@/shared/helpers';
import { ILoggerLocal, IUuidGenerator } from '@/shared/protocols';

export interface CreateTesteRatinhoRequest {
  name: string;
}

export type CreateTesteRatinhoResponse = TesteRatinhoDTO;

export class CreateTesteRatinhoController {
  private usecase: CreateTesteRatinhoUsecase;
  private logger: ILoggerLocal;

  constructor(
    getTesteRatinhoByNameRepository: IGetTesteRatinhoByNameRepository,
    uuidGenerator: IUuidGenerator,
    saveTesteRatinhoRepository: ISaveTesteRatinhoRepository,
    private readonly validation: Validation,
    logger: ILoggerLocal
  ) {
    this.usecase = new CreateTesteRatinhoUsecase(
      getTesteRatinhoByNameRepository,
      uuidGenerator,
      saveTesteRatinhoRepository,
      logger
    );

    this.logger = logger.child({ controller: 'create-teste-ratinho' });
  }

  async execute(
    request: CreateTesteRatinhoRequest
  ): Promise<CreateTesteRatinhoResponse> {
    this.logger.logDebug({ message: 'Request received', data: request });

    const { name } = request;

    const hasError = this.validation.validate({
      name,
    });

    if (hasError) {
      throw new ValidationException(hasError);
    }

    this.logger.logDebug({ message: 'Params validated' });

    const testeRatinhoCreated = await this.usecase.execute({ name });

    const testeRatinhoCreatedDTO =
      TesteRatinhoTransformer.generateDTO(testeRatinhoCreated);

    this.logger.logDebug({
      message: 'TesteRatinho created',
      data: testeRatinhoCreatedDTO,
    });

    return testeRatinhoCreatedDTO;
  }
}
