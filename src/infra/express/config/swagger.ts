import swaggerConfig from '@/infra/swagger/docs';
import { noCache } from '@/main/middlewares';

import { serve, setup } from 'swagger-ui-express';
import { Express, Request, Response } from 'express';

export default (app: Express): void => {
  app.use('/docs', noCache, serve, setup(swaggerConfig));
  app.get('/', (req: Request, res: Response) => res.redirect('/docs'));
};
