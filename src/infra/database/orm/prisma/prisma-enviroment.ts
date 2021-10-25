import('dotenv');

export default {
  databaseHost: process.env.DATABASE_HOST as string,
  databasePort: process.env.DATABASE_PORT as string,
  databaseName: process.env.DATABASE_NAME as string,
  databaseUsername: process.env.DATABASE_USERNAME as string,
  databaseUserPassword: process.env.DATABASE_PASSWORD as string,
};
