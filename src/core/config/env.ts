import 'dotenv/config';

export const env = {
  application: {
    mode: process.env.NODE_ENV as string,
  },
  cors: {
    urls: [...(process.env.CORS_URLS ? process.env.CORS_URLS.split(',') : [])],
  },
  httpServer: {
    port: parseInt(process.env.API_PORT as string, 10) || (3001 as number),
  },
  databases: {
    postgres: {
      url: process.env.DATABASE_URL as string,
    },
  },
  logs: {
    sentry: {
      url: process.env.SENTRY_URL as string,
    },
  },
  saltRounds: parseInt(process.env.SALT_ROUNDS as string, 10),
  emailSender: process.env.EMAIL_SENDER as string,
  sendGrid: {
    apiKey: process.env.SENDGRID_API_KEY as string,
  },
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiresIn: process.env.JWT_EXPIRES_IN as string,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN as string,
  },
  confirmEmailLink: process.env.CONFIRM_EMAIL_REDIRECT_LINK as string,
  confirmForgotLink: process.env.CONFIRM_FORGOT_REDIRECT_LINK as string,
  welcomeEmailLink: process.env.WELCOME_EMAIL_LINK as string,
  swagger: {
    url: process.env.SWAGGER_URL,
  },
  aws: {
    region: process.env.AWS_REGION as string,
    bucket: process.env.AWS_BUCKET_NAME as string,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
  redisUrl: process.env.REDIS_URL as string,
  maxRequestsPerHour: parseInt(process.env.MAX_REQUESTS_PER_HOUR as string, 10),
};

export const env2 = {
  application: {
    mode: process.env.NODE_ENV as string,
  },
  cors: {
    production: {
      url: process.env.PRODUCTION_DEPLOY_URL as string,
      frontUrl: process.env.PRODUCTION_FRONT_DEPLOY_URL as string,
    },
    stage: {
      url: process.env.STAGE_DEPLOY_URL as string,
      frontUrl: process.env.STAGE_FRONT_DEPLOY_URL as string,
    },
  },
  httpServer: {
    port: parseInt(process.env.API_PORT as string, 10) || (3001 as number),
  },
  databases: {
    postgres: {
      url: `postgresql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}?schema=public`,
    },
  },
  logs: {
    sentry: {
      url: process.env.SENTRY_URL as string,
    },
  },
  cloud: {
    cognito: {
      apiVersion: process.env.COGNITO_API_VERSION as string,
      region: process.env.COGNITO_REGION as string,
      clientId: process.env.COGNITO_CLIENT_ID as string,
      userPoolId: process.env.COGNITO_USER_POOL_ID as string,
    },
  },
  storage: {
    s3: {
      bucketName: process.env.AWS_BUCKET_NAME as string,
      region: process.env.AWS_BUCKET_REGION as string,
      accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_BUCKET_SECRET_ACCESS_KEY as string,
      folderAwsS3Bucket: process.env.AWS_S3_FOLDER as string,
    },
  },
};
