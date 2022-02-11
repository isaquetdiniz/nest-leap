import { Validation } from '@/shared/interface/validation/protocols';
import {
  IDeleteTesteRatinhoByIdRepository,
  IGetTesteRatinhoByIdRepository,
  DeleteTesteRatinhoByIdUsecase,
} from '@/domains/teste-ratinho';
import { ValidationException } from '@/shared/helpers';
import { ILoggerLocal } from '@/shared/protocols';

export interface DeleteTesteRatinhoByIdRequest {
  id: string;
}

export type DeleteTesteRatinhoByIdResponse = void;

export class DeleteTesteRatinhoByIdController {
  private usecase: DeleteTesteRatinhoByIdUsecase;
  private logger: ILoggerLocal;

  constructor(
    getTesteRatinhoByIdRepository: IGetTesteRatinhoByIdRepository,
    deleteTesteRatinhoByIdRepository: IDeleteTesteRatinhoByIdRepository,
    private readonly validation: Validation,
    logger: ILoggerLocal
  ) {
    this.usecase = new DeleteTesteRatinhoByIdUsecase(
      getTesteRatinhoByIdRepository,
      deleteTesteRatinhoByIdRepository,
      logger
    );

    this.logger = logger.child({ controller: 'delete-teste-ratinho-by-id' });
  }

  async execute(
    request: DeleteTesteRatinhoByIdRequest
  ): Promise<DeleteTesteRatinhoByIdResponse> {
    this.logger.logDebug({ message: 'Request received', data: request });

    const { id } = request;

    const hasError = this.validation.validate({ id });

    if (hasError) {
      throw new ValidationException(hasError);
    }

    this.logger.logDebug({ message: 'Params validated' });

    await this.usecase.execute(id);

    this.logger.logDebug({ message: 'TesteRatinho deleted', data: { id } });
  }
}
