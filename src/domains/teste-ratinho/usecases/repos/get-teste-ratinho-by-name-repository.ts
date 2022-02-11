import { TesteRatinhoDTO } from '@/domains/teste-ratinho';

export interface IGetTesteRatinhoByNameRepository {
  get(
    name: IGetTesteRatinhoByNameRepository.Params
  ): Promise<IGetTesteRatinhoByNameRepository.Result>;
}

export namespace IGetTesteRatinhoByNameRepository {
  export type Params = string;
  export type Result = TesteRatinhoDTO | null;
}
