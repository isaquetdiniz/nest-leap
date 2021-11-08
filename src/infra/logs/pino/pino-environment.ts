import 'dotenv/config';

export default {
  enabled: process.env.environment !== 'test',
  level: process.env.environment === 'production' ? 'info' : 'debug',
  pretty: process.env.environment === 'development',
};
