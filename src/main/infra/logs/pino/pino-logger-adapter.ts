import pino, { P } from 'pino';
import pinoEnvironment from './pino-environment';
import { ILoggerLocal } from '@/shared/protocols';

class PinoLoggerLocal implements ILoggerLocal {
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

  logInfo(message: any): void {
    this.pinoInstance.info(message);
  }

  logDebug(message: any): void {
    this.pinoInstance.debug(message);
  }

  logError(error: any): void {
    this.pinoInstance.error(error);
  }
}

const pinoLoggerLocal = new PinoLoggerLocal();

export { pinoLoggerLocal };
