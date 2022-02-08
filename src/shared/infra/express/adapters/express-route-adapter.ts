import { HttpController } from '@/shared/interface/http/protocols';

import { Request, Response } from 'express';
import { convertProperties } from '@/shared/helpers/query-converter-helper';

export const adaptRoute = (controller: HttpController) => {
  // @ts-ignore
  return async (req: Request, res: Response) => {
    const httRequest = {
      // @ts-ignore
      userRequester: req.userRequester || null,
      ...req.body,
      ...convertProperties({ ...req.params, ...req.query }),
    };

    const httpResponse = await controller.handle(httRequest);

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res
        .status(httpResponse.statusCode)
        .json({ error: httpResponse.body.message });
    }
  };
};
