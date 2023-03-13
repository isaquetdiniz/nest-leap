import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class PrismaInterceptor implements NestInterceptor {
  constructor(private readonly prismaService: PrismaService) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const request = ctx.switchToHttp().getRequest();

    request.prisma = this.prismaService;

    return next.handle();
  }
}