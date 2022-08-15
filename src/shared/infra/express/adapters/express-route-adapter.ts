import { HttpController } from '@/shared/interface/http/protocols';

import { Request, Response, NextFunction } from 'express';
import { convertProperties } from '@/shared/helpers/query-converter-helper';

export const adaptRoute = (controller: HttpController) => {
  // @ts-ignore
  return async (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line no-undef
    const file: Express.Multer.File | undefined = req.file ?? undefined;

    const httpRequest = {
      // @ts-ignore
      userRequester: req.userRequester || null,
      ...req.body,
      ...convertProperties({ ...req.params, ...req.query }),
      file,
    };

    const httpResponse = await controller.handle(httpRequest);

    res.locals.response = httpResponse;

    next();
  };
};
