import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { NullPointerException } from '@/core/application';

export const PrismaRepositoryParam = createParamDecorator(
  (Repository: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const { prisma } = request;

    if (!prisma) {
      throw new NullPointerException('Prisma not found');
    }

    return new Repository(prisma);
  },
);
