import {
  TesteRatinho,
  IGetTesteRatinhoByIdRepository,
} from '@/domains/teste-ratinho';

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
  constructor(
    private readonly getTesteRatinhoByIdRepository: IGetTesteRatinhoByIdRepository
  ) {}

  async execute(
    id: IGetTesteRatinhobyIdUsecase.Params
  ): Promise<IGetTesteRatinhobyIdUsecase.Result> {
    const testeRatinhoExists = await this.getTesteRatinhoByIdRepository.get(id);

    if (!testeRatinhoExists) return null;

    const testeRatinhoFounded = new TesteRatinho(testeRatinhoExists);

    return testeRatinhoFounded;
  }
}
