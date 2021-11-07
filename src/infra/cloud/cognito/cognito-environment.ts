import 'dotenv/config';

export default {
  apiVersion: process.env.COGNITO_API_VERSION as string,
  region: process.env.COGNITO_REGION as string,
  accessKeyId: process.env.COGNITO_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.COGNITO_SECRET_ACCESS_KEY as string,
  clientId: process.env.COGNITO_CLIENT_ID as string,
  authFlow: process.env.COGNITO_AUTH_FLOW as string,
  userPoolId: process.env.COGNITO_USER_POOL_ID as string,
};
