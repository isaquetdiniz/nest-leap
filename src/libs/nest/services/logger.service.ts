import { Logger } from '@nestjs/common';
import { ILoggerProvider } from '@/core/application';

export class NestLoggerService implements ILoggerProvider {
  constructor(private readonly logger: Logger) {}

  info(message: any): void {
    this.logger.verbose(message);
  }

  debug(message: any): void {
    this.logger.log(message);
  }

  error(message: any): void {
    this.logger.error(message);
  }
}
