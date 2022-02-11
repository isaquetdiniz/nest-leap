import {
  IGetTesteRatinhoByIdRepository,
  IDeleteTesteRatinhoByIdRepository,
  TesteRatinhoNotFoundException,
} from '@/domains/teste-ratinho';

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
  constructor(
    private readonly getTesteRatinhoByIdRepository: IGetTesteRatinhoByIdRepository,
    private readonly deleteTesteRatinhoByIdRepository: IDeleteTesteRatinhoByIdRepository
  ) {}

  async execute(
    id: IDeleteTesteRatinhoByIdUsecase.Params
  ): Promise<IDeleteTesteRatinhoByIdUsecase.Result> {
    const testeRatinhoExists = await this.getTesteRatinhoByIdRepository.get(id);

    if (!testeRatinhoExists) {
      throw new TesteRatinhoNotFoundException({ id });
    }

    await this.deleteTesteRatinhoByIdRepository.delete(id);
  }
}
