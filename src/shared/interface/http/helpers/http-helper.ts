import { HttpResponse } from '@/shared/interface/http/protocols';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error,
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: error,
});

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});

export const ok = (data?: any): HttpResponse => {
  return {
    statusCode: 200,
    body: data,
  };
};

export const conflict = (error: any): HttpResponse => ({
  statusCode: 409,
  body: error,
});

export const updated = (data?: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const forbidden = (data?: any): HttpResponse => ({
  statusCode: 403,
  body: data,
});

export const unauthorized = (data?: any): HttpResponse => ({
  statusCode: 401,
  body: data,
});
