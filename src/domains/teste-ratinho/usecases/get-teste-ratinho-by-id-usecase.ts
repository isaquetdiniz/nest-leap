import {
  TesteRatinho,
  IGetTesteRatinhoByIdRepository,
} from '@/domains/teste-ratinho';

import { ILoggerLocal } from '@/shared/protocols';

export interface IGetTesteRatinhobyIdUsecase {
  execute(
    id: IGetTesteRatinhobyIdUsecase.Params
  ): Promise<IGetTesteRatinhobyIdUsecase.Result>;
}

export namespace IGetTesteRatinhobyIdUsecase {
  export type Params = string;
  export type Result = TesteRatinho | null;
}

export class GetTesteRatinhoByIdUsecase implements IGetTesteRatinhobyIdUsecase {
  private logger: ILoggerLocal;

  constructor(
    private readonly getTesteRatinhoByIdRepository: IGetTesteRatinhoByIdRepository,
    logger: ILoggerLocal
  ) {
    this.logger = logger.child({ usecase: 'get-teste-ratinho-by-id' });
  }

  async execute(
    id: IGetTesteRatinhobyIdUsecase.Params
  ): Promise<IGetTesteRatinhobyIdUsecase.Result> {
    this.logger.logDebug({ message: 'Request received', data: { id } });

    const testeRatinhoExists = await this.getTesteRatinhoByIdRepository.get(id);

    if (!testeRatinhoExists) return null;

    const testeRatinhoFounded = new TesteRatinho(testeRatinhoExists);

    this.logger.logDebug({
      message: 'TesteRatinho found',
      data: testeRatinhoFounded,
    });

    return testeRatinhoFounded;
  }
}
