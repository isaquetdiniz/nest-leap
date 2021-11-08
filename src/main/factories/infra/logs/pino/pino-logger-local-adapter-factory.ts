import { LoggerLocal } from '@/application/protocols/logs';
import { PinoLoggerLocalAdapter } from '@/infra/logs/pino';

export const makePinoLoggerLocalAdapter = (): LoggerLocal => {
  return new PinoLoggerLocalAdapter();
};
