export interface IFileUpdateHandler {
  updateFile(
    params: IFileUpdateHandler.Params
  ): Promise<IFileUpdateHandler.Result>;
}

export namespace IFileUpdateHandler {
  export type Params = {
    // eslint-disable-next-line no-undef
    newFile: Express.Multer.File;
    previousFileURL?: string;
  };

  export type Result = string;
}
