import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { NestLoggerService } from '../services/logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const request = ctx.switchToHttp().getRequest();

    const logger = new Logger();

    request.logger = new NestLoggerService(logger);

    return next.handle();
  }
}
