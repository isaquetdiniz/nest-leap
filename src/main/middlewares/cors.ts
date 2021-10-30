import { Request, Response, NextFunction } from 'express';
// @ts-ignore
import('dotenv/config');

const permitedUrl =
  process.env.NODE === 'production'
    ? (process.env.FRONT_PROD_URL as string)
    : (process.env.FRONT_STAGING_URL as string);

export const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.set('access-control-allow-origin', permitedUrl);
  res.set('access-control-allow-methods', '*');
  res.set('access-control-allow-headers', '*');
  next();
};
