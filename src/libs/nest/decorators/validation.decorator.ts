import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ValidationParam = createParamDecorator(
  (Validation: any, ctx: ExecutionContext) => {
    return new Validation();
  },
);
