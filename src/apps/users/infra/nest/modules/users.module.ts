import { Module } from '@nestjs/common';
import { NestCreateUserRestController } from '@/users/infra';

@Module({
  imports: [],
  controllers: [NestCreateUserRestController],
})
export class UsersModule {}
