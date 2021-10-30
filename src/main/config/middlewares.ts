import { Express } from 'express';

import {
  bodyParser,
  cors,
  contentType,
  helmetMiddleware,
} from '@/main/middlewares';

export default (app: Express): void => {
  app.use(helmetMiddleware);
  app.use(bodyParser);
  app.use(cors);
  app.use(contentType);
};
