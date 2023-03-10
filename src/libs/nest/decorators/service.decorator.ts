import { PrismaInterceptor } from '@/libs/prisma';
import { applyDecorators, UseFilters, UseInterceptors } from '@nestjs/common';
import { EventEmitterInterceptor } from '../interceptors/event_emitter.interceptor';
import { LoggerInterceptor } from '../interceptors/logger.interceptor';

export function Service(interceptors: any[] = []) {
  return applyDecorators(
    //UseFilters(DefaultExceptionFilter),
    UseInterceptors(
      LoggerInterceptor,
      PrismaInterceptor,
      EventEmitterInterceptor,
      ...interceptors,
    ),
  );
}

export const ObserverController = Service;
