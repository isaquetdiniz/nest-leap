import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { NullPointerException } from '@/shared/application';

export const LoggerParam = createParamDecorator(
  (Class: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.logger) {
      throw new NullPointerException('Logger not found');
    }

    return request.logger.child({ context: Class.name });
  },
);
