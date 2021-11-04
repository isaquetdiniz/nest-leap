import('dotenv');

export default {
  dns: process.env.SENTRY_URL as string,
  environment: process.env.NODE as string,
};
