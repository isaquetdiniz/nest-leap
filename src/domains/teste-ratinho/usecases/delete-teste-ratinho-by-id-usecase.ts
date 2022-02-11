import {
  IGetTesteRatinhoByIdRepository,
  IDeleteTesteRatinhoByIdRepository,
  TesteRatinhoNotFoundException,
} from '@/domains/teste-ratinho';

import { ILoggerLocal } from '@/shared/protocols';

export interface IDeleteTesteRatinhoByIdUsecase {
  execute(
    id: IDeleteTesteRatinhoByIdUsecase.Params
  ): Promise<IDeleteTesteRatinhoByIdUsecase.Result>;
}

export namespace IDeleteTesteRatinhoByIdUsecase {
  export type Params = string;
  export type Result = void;
}

export class DeleteTesteRatinhoByIdUsecase
  implements IDeleteTesteRatinhoByIdUsecase
{
  private logger: ILoggerLocal;

  constructor(
    private readonly getTesteRatinhoByIdRepository: IGetTesteRatinhoByIdRepository,
    private readonly deleteTesteRatinhoByIdRepository: IDeleteTesteRatinhoByIdRepository,
    logger: ILoggerLocal
  ) {
    this.logger = logger.child({ usecase: 'delete-teste-ratinho-by-id' });
  }

  async execute(
    id: IDeleteTesteRatinhoByIdUsecase.Params
  ): Promise<IDeleteTesteRatinhoByIdUsecase.Result> {
    this.logger.logDebug({ message: 'Request received', data: { id } });

    const testeRatinhoExists = await this.getTesteRatinhoByIdRepository.get(id);

    if (!testeRatinhoExists) {
      throw new TesteRatinhoNotFoundException({ id });
    }

    this.logger.logDebug({
      message: 'TesteRatinho found',
      data: testeRatinhoExists,
    });

    await this.deleteTesteRatinhoByIdRepository.delete(id);

    this.logger.logDebug({ message: 'TesteRatinho deleted', data: { id } });
  }
}
