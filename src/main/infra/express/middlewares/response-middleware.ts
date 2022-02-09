import { NextFunction, Request, Response } from 'express';

export const responseMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { response: httpResponse } = res.locals;

  if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
    res.status(httpResponse.statusCode).json(httpResponse.body);
  } else {
    next(httpResponse);
  }
};
