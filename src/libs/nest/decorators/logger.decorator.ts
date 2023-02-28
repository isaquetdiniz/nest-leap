import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { NullPointerException } from '@/core/application';

export const LoggerParam = createParamDecorator(
  (Class: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const { logger } = request;

    if (!logger) {
      throw new NullPointerException('Logger not found');
    }

    return logger;
  },
);
