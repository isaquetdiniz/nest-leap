import { LoggerError } from '@/application/protocols/utils';
import { SentryLoggerErrorAdapter } from '@/infra/sentry';

export const makeSentryLoggerErrorAdapter = (): LoggerError => {
  return new SentryLoggerErrorAdapter();
};
