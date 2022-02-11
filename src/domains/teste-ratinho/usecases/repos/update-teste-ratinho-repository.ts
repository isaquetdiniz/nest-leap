import { TesteRatinhoDTO } from '@/domains/teste-ratinho';

export interface IUpdateTesteRatinhoRepository {
  update(
    testeRatinhoToUpdate: IUpdateTesteRatinhoRepository.Params
  ): Promise<IUpdateTesteRatinhoRepository.Result>;
}

export namespace IUpdateTesteRatinhoRepository {
  export type Params = TesteRatinhoDTO;
  export type Result = TesteRatinhoDTO;
}
