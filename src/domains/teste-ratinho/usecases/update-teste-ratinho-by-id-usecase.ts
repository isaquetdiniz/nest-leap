import {
  TesteRatinho,
  IGetTesteRatinhoByIdRepository,
  IUpdateTesteRatinhoRepository,
  TesteRatinhoNotFoundException,
  TesteRatinhoTransformer,
} from '@/domains/teste-ratinho';

import { ILoggerLocal } from '@/shared/protocols';

export interface IUpdateTesteRatinhoByIdUsecase {
  execute(
    updateParams: IUpdateTesteRatinhoByIdUsecase.Params
  ): Promise<IUpdateTesteRatinhoByIdUsecase.Result>;
}

export namespace IUpdateTesteRatinhoByIdUsecase {
  export type Params = {
    id: string;
    paramsToUpdate: {
      name?: string;
      enabled?: boolean;
    };
  };
  export type Result = TesteRatinho;
}

export class UpdateTesteRatinhoByIdUsecase
  implements IUpdateTesteRatinhoByIdUsecase
{
  private logger: ILoggerLocal;

  constructor(
    private readonly getTesteRatinhoByIdRepository: IGetTesteRatinhoByIdRepository,
    private readonly updateTesteRatinhoRepository: IUpdateTesteRatinhoRepository,
    logger: ILoggerLocal
  ) {
    this.logger = logger.child({ usecase: 'update-teste-ratinho-by-id' });
  }

  async execute(
    updateParams: IUpdateTesteRatinhoByIdUsecase.Params
  ): Promise<IUpdateTesteRatinhoByIdUsecase.Result> {
    this.logger.logDebug({ message: 'Request received', data: updateParams });

    const { id, paramsToUpdate } = updateParams;

    const testeRatinhoExists = await this.getTesteRatinhoByIdRepository.get(id);

    if (!testeRatinhoExists) {
      throw new TesteRatinhoNotFoundException({ id });
    }

    this.logger.logDebug({
      message: 'TesteRatinho found',
      data: testeRatinhoExists,
    });

    const testeRatinhoToUpdate = new TesteRatinho({
      ...testeRatinhoExists,
      ...paramsToUpdate,
    });

    const testeRatinhoToUpdateDTO =
      TesteRatinhoTransformer.generateDTO(testeRatinhoToUpdate);

    const testeRatinhoUpdatedDTO =
      await this.updateTesteRatinhoRepository.update(testeRatinhoToUpdateDTO);

    const testeRatinhoUpdated = new TesteRatinho(testeRatinhoUpdatedDTO);

    this.logger.logDebug({
      message: 'TesteRatinho updated',
      data: testeRatinhoUpdated,
    });

    return testeRatinhoUpdated;
  }
}
