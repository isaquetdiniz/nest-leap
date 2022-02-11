import {
  DefaultException,
  ExceptionTypes,
} from '@/shared/helpers/error-helper';

import { TesteRatinhoDTO } from '@/domains/teste-ratinho';

export class TesteRatinhoNotFoundException extends DefaultException {
  constructor(testeRatinho: Partial<TesteRatinhoDTO>) {
    super({
      type: ExceptionTypes.USER,
      code: 'TESTE_RATINHO_NOT_FOUND',
      data: testeRatinho,
    });
  }
}
