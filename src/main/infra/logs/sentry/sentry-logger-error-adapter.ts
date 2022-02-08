import * as Sentry from '@sentry/node';

import { ILoggerCloud } from '@/shared/protocols';
import sentryEnvironment from './sentry-environment';

class SentryLoggerCloud implements ILoggerCloud {
  private hasSetuped: boolean = false;

  setup() {
    Sentry.init({
      dsn: sentryEnvironment.dns,
      environment: sentryEnvironment.environment,
      tracesSampleRate: 1.0,
    });

    this.hasSetuped = true;
  }

  logError(error: Error): void {
    if (this.hasSetuped === false) {
      this.setup();
    }

    const transaction = Sentry.startTransaction({
      op: error.stack,
      name: error.name,
    });

    Sentry.captureException(error);

    transaction.finish();
  }
}

const sentryLoggerCloud = new SentryLoggerCloud();

export { sentryLoggerCloud };
