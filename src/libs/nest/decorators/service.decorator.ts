import { PrismaInterceptor } from '@/libs/prisma';
import { applyDecorators, UseFilters, UseInterceptors } from '@nestjs/common';
import { LoggerInterceptor } from '../interceptors/logger.interceptor';

export function Service(interceptors: any[] = []) {
  return applyDecorators(
    //UseFilters(DefaultExceptionFilter),
    UseInterceptors(LoggerInterceptor, PrismaInterceptor, ...interceptors),
  );
}

export const ObserverController = Service;
