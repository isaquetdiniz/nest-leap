import { createParamDecorator } from '@nestjs/common';

export const ValidationParam = createParamDecorator((Validation: any) => {
  return new Validation();
});
