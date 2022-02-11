import {
  TesteRatinho,
  IGetTesteRatinhoByIdRepository,
  IUpdateTesteRatinhoRepository,
  TesteRatinhoNotFoundException,
  TesteRatinhoTransformer,
} from '@/domains/teste-ratinho';

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
  constructor(
    private readonly getTesteRatinhoByIdRepository: IGetTesteRatinhoByIdRepository,
    private readonly updateTesteRatinhoRepository: IUpdateTesteRatinhoRepository
  ) {}

  async execute(
    updateParams: IUpdateTesteRatinhoByIdUsecase.Params
  ): Promise<IUpdateTesteRatinhoByIdUsecase.Result> {
    const { id, paramsToUpdate } = updateParams;

    const testeRatinhoExists = await this.getTesteRatinhoByIdRepository.get(id);

    if (!testeRatinhoExists) {
      throw new TesteRatinhoNotFoundException({ id });
    }

    const testeRatinhoToUpdate = new TesteRatinho({
      ...testeRatinhoExists,
      ...paramsToUpdate,
    });

    const testeRatinhoToUpdateDTO =
      TesteRatinhoTransformer.generateDTO(testeRatinhoToUpdate);

    const testeRatinhoUpdatedDTO =
      await this.updateTesteRatinhoRepository.update(testeRatinhoToUpdateDTO);

    const testeRatinhoUpdated = new TesteRatinho(testeRatinhoUpdatedDTO);

    return testeRatinhoUpdated;
  }
}
