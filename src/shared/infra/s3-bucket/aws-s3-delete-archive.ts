import aws, { S3 } from 'aws-sdk';

import { s3Environments, IDeleteArchive } from '@/shared/interface/s3-bucket';
import { AwsS3Exception } from './aws-s3-exception';
import { env } from '@/main/config';

import { ILoggerLocal } from '@/shared/protocols';
import { pinoLoggerLocal } from '../logs';

export class AwsS3DeleteArchive implements IDeleteArchive {
  private readonly s3Instance: S3;
  private logger: ILoggerLocal;

  constructor() {
    this.s3Instance = new aws.S3({
      region: s3Environments.region,
      signatureVersion: 'v4',
      ...(env.application.mode === 'local'
        ? {
            credentials: {
              accessKeyId: s3Environments.accessKeyId,
              secretAccessKey: s3Environments.secretAccessKey,
            },
          }
        : {}),
    });
    this.logger = pinoLoggerLocal;
  }

  async delete(params: IDeleteArchive.Params): Promise<void> {
    this.logger.logDebug({
      message: 'AwsS3DeleteArchive',
      params,
    });

    const { path } = params;

    const pathWithoutLink = path.replace(
      `https://${s3Environments.bucketName}.s3.amazonaws.com/`,
      ''
    );

    const deleteParams: S3.DeleteObjectRequest = {
      Bucket: s3Environments.bucketName,
      Key: pathWithoutLink,
    };

    this.logger.logDebug({
      message: 'AwsS3DeleteArchive-Delete-params',
      deleteParams,
    });

    return new Promise((resolve, reject) => {
      this.s3Instance.deleteObject(deleteParams, (err, data) => {
        if (err) {
          throw new AwsS3Exception(err, 'Delete Error');
        }

        this.logger.logDebug({
          message: 'AwsS3DeleteArchive-Archive-Deleted',
          deleteParams,
        });

        resolve();
      });
    });
  }
}
