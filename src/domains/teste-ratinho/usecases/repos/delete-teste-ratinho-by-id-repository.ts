export interface IDeleteTesteRatinhoByIdRepository {
  delete(
    id: IDeleteTesteRatinhoByIdRepository.Params
  ): Promise<IDeleteTesteRatinhoByIdRepository.Result>;
}

export namespace IDeleteTesteRatinhoByIdRepository {
  export type Params = string;
  export type Result = void;
}
