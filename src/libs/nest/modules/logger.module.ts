import { Inject, Module } from '@nestjs/common';
import { NestLoggerService } from '../services/logger.service';

export const LOGGER = 'LOGGER';

export const InjectLogger = () => Inject(LOGGER);

@Module({
  providers: [{ provide: LOGGER, useClass: NestLoggerService }],
  exports: [LOGGER],
})
export class LoggerModule {}
