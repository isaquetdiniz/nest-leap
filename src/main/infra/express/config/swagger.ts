import swaggerConfig from '@/shared/infra/swagger';
import { noCache } from '@/shared/infra/express/middlewares';

import { serve, setup } from 'swagger-ui-express';
import { Express, Request, Response } from 'express';

export default (app: Express): void => {
  app.use('/docs', noCache, serve, setup(swaggerConfig));
  app.get('/', (req: Request, res: Response) => res.redirect('/docs'));
};
