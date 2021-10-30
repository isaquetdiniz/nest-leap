import 'dotenv/config';

export default {
  mode: process.env.NODE as string,
  deployUrl: process.env.DEPLOY_URL as string,
  port: parseInt(process.env.API_PORT, 10) || (3001 as number),
  databaseUrl: process.env.DATABASE_URL as string,
  jwtSecret: process.env.API_SECRET as string,
};
