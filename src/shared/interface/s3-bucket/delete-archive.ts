export interface IDeleteArchive {
  delete(params: IDeleteArchive.Params): Promise<IDeleteArchive.Result>;
}

export namespace IDeleteArchive {
  export type Params = {
    path: string;
  };

  export type Result = void;
}
