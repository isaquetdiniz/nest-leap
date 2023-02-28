import { Inject, Module } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';

export const PRISMA = 'PRISMA';

export const InjectPrisma = () => Inject(PRISMA);

@Module({
  providers: [{ provide: PRISMA, useClass: PrismaService }],
  exports: [PRISMA],
})
export class PrismaModule {}
