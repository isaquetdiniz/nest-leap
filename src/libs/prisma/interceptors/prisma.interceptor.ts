import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { InjectPrisma } from '../module/prisma.module';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class PrismaInterceptor implements NestInterceptor {
  constructor(@InjectPrisma() private service: PrismaService) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const request = ctx.switchToHttp().getRequest();

    request.prisma = this.service;

    return next.handle();
  }
}
