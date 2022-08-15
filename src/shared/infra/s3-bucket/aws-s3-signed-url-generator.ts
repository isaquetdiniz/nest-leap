import aws, { S3 } from 'aws-sdk';

import {
  s3Environments,
  ISignedUrlGenerator,
} from '@/shared/interface/s3-bucket';
import { env } from '@/main/config';

import { ILoggerLocal } from '@/shared/protocols';
import { pinoLoggerLocal } from '../logs';

export class AwsS3SignedUrlGenerator implements ISignedUrlGenerator {
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

  async sign(params: ISignedUrlGenerator.Params): Promise<string> {
    this.logger.logDebug({
      message: 'Aws-S3-SignedUrlGenerator',
      params,
    });

    const { url } = params;

    const key = url.replace(
      `https://${s3Environments.bucketName}.s3.amazonaws.com/`,
      ''
    );

    const paramsToSign = {
      Key: key,
      Bucket: s3Environments.bucketName,
      Expires: 600,
    };

    this.logger.logDebug({
      message: 'SignedUrlGenerator-Params-to-sign',
      paramsToSign,
    });

    return new Promise((resolve, reject) => {
      this.s3Instance.getSignedUrl('getObject', paramsToSign, (err, data) => {
        if (err) {
          reject(err);

          this.logger.logError({
            message: 'SignedUrlGenerator-Error',
            err,
          });

          return;
        }
        this.logger.logDebug({
          message: 'Url-Signed',
          paramsToSign,
        });

        resolve(data);
      });
    });
  }
}
