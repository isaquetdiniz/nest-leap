import { Controller } from '@/presentation/http/protocols';
import { LogControllerDecorator } from '@/main/decorators';
import { makeSentryLoggerErrorAdapter } from '@/main/factories/infra/sentry';

export const makeLogControllerDecorator = (
  controller: Controller
): Controller => {
  const sentryLoggerErrorAdapter = makeSentryLoggerErrorAdapter();
  const logControllerDecorator = new LogControllerDecorator(
    controller,
    sentryLoggerErrorAdapter
  );

  return logControllerDecorator;
};
