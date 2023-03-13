import { Module } from '@nestjs/common';
import { AwsService } from '@/libs/aws';

@Module({
  providers: [AwsService],
  exports: [AwsService],
})
export class AwsModule {}
