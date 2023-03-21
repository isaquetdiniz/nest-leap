import { PrismaInterceptor } from '@/libs/prisma';
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { EventEmitterInterceptor } from '../interceptors/event_emitter.interceptor';

export function Service(interceptors: any[] = []) {
  return applyDecorators(
    //UseFilters(DefaultExceptionFilter),
    UseInterceptors(
      PrismaInterceptor,
      EventEmitterInterceptor,
      ...interceptors,
    ),
  );
}

export const ObserverController = Service;
