import { ExceptionTypes, DefaultException } from '@/shared/helpers';
import { NextFunction, Request, Response } from 'express';

export const errorMiddleware = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const status = error.statusCode || 500;

  const exception =
    error.body instanceof DefaultException
      ? {
          type: error.body?.type,
          code: error.body?.code,
          data: error.body?.data?.name,
          message: error.body?.data?.message,
        }
      : {
          type: ExceptionTypes.UNKNOWN,
          code: '1',
          data: error.stack,
          message: error.message,
        };

  res.status(status).json(exception);
};
