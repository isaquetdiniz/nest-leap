import { HttpController } from '@/shared/interface/http/protocols';

import { Request, Response, NextFunction } from 'express';
import { convertProperties } from '@/shared/helpers/query-converter-helper';

export const adaptRoute = (controller: HttpController) => {
  // @ts-ignore
  return async (req: Request, res: Response, next: NextFunction) => {
    const httRequest = {
      // @ts-ignore
      userRequester: req.userRequester || null,
      ...req.body,
      ...convertProperties({ ...req.params, ...req.query }),
    };

    const httpResponse = await controller.handle(httRequest);

    res.locals.response = httpResponse;

    next();
  };
};
