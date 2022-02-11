import { TesteRatinhoDTO } from '@/domains/teste-ratinho';

export interface IGetTesteRatinhoByIdRepository {
  get(
    id: IGetTesteRatinhoByIdRepository.Params
  ): Promise<IGetTesteRatinhoByIdRepository.Result>;
}

export namespace IGetTesteRatinhoByIdRepository {
  export type Params = string;
  export type Result = TesteRatinhoDTO | null;
}
