import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { NullPointerException } from '@/core/application';

export const AuthUserParam = createParamDecorator(
  (Class: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const { user } = request;

    if (!user) {
      throw new NullPointerException('User not found');
    }

    return user;
  },
);
