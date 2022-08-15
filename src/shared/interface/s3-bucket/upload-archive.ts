export interface IUploadArchive {
  upload(params: IUploadArchive.Params): Promise<IUploadArchive.Result>;
}

export namespace IUploadArchive {
  export type Params = {
    // eslint-disable-next-line no-undef
    file: Express.Multer.File;
  };

  export type Result = string;
}
