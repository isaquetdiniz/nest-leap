import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateUserRestController } from '@/api-users/infra';
import { PrismaModule } from '@/libs/prisma';
import { LoggerModule } from '@/libs/nest';

@Module({
  imports: [ConfigModule.forRoot(), LoggerModule, PrismaModule],
  controllers: [CreateUserRestController],
})
export class ApiUsersModule {}
