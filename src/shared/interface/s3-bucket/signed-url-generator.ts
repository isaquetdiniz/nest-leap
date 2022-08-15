export interface ISignedUrlGenerator {
  sign(params: ISignedUrlGenerator.Params): Promise<ISignedUrlGenerator.Result>;
}

export namespace ISignedUrlGenerator {
  export type Params = {
    url: string;
  };

  export type Result = string;
}
