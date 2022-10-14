import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { NullPointerException } from '@/shared/application';

export const PrismaRepositoryParam = createParamDecorator(
  (Repository: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const { prismaConnection } = request;

    if (!prismaConnection) {
      throw new NullPointerException('Prisma connection not found');
    }

    return new Repository(prismaConnection);
  },
);
