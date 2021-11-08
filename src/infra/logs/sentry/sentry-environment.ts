import 'dotenv/config';

export default {
  dns: process.env.SENTRY_URL as string,
  environment: process.env.environment as string,
};
