import { Router, Request, Response } from 'express';

export default (router: Router): void => {
  router.get('/health-check', async (req: Request, res: Response) => {
    res.send(200);
  });
};
