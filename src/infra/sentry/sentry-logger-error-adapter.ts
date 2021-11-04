import * as Sentry from '@sentry/node';

import { LoggerError } from '@/application/protocols/utils/logger-error';
import sentryEnvironment from './sentry-environment';

export class SentryLoggerErrorAdapter implements LoggerError {
  static setup(): void {
    Sentry.init({
      dsn: sentryEnvironment.dns,
      environment: sentryEnvironment.environment,
      tracesSampleRate: 1.0,
    });
  }

  log(error: Error): void {
    const transaction = Sentry.startTransaction({
      op: error.stack,
      name: error.name,
    });

    Sentry.captureException(error);

    transaction.finish();
  }
}
