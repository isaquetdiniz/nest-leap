import { Logger } from '@/application/protocols/utils';
import { PinoLoggerAdapter } from '@/infra/pino';

export const makePinoLoggerAdapter = (): Logger => {
  return new PinoLoggerAdapter();
};
