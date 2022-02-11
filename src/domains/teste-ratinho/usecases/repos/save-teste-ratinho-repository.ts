import { TesteRatinhoDTO } from '@/domains/teste-ratinho';

export interface ISaveTesteRatinhoRepository {
  save(
    testeRatinhoParams: ISaveTesteRatinhoRepository.Params
  ): Promise<ISaveTesteRatinhoRepository.Result>;
}

export namespace ISaveTesteRatinhoRepository {
  export type Params = TesteRatinhoDTO;
  export type Result = TesteRatinhoDTO;
}
