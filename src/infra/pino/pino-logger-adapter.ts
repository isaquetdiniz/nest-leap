import pino, { P } from 'pino';
import { Logger } from '@/application/protocols/utils';
import pinoEnvironment from './pino-environment';

export class PinoLoggerAdapter implements Logger {
  private readonly pinoInstance: P.Logger = pino({
    enabled: pinoEnvironment.enabled,
    level: pinoEnvironment.level,
    ...(pinoEnvironment.pretty
      ? {
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
            },
          },
        }
      : {}),
  });

  logInfo(message: string): void {
    this.pinoInstance.info(message);
  }
}
