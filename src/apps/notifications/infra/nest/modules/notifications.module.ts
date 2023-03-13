import { Module } from '@nestjs/common';
import {
  EmailObserver,
  PrismaEmailRepository,
  PrismaEmailTemplateRepository,
} from '@/notifications/infra';
import { AwsModule, AwsSesEmailService } from '@/libs/aws';
import { PrismaModule } from '@/libs/prisma';

@Module({
  imports: [PrismaModule, AwsModule],
  providers: [
    EmailObserver,
    PrismaEmailTemplateRepository,
    PrismaEmailRepository,
    AwsSesEmailService,
  ],
})
export class NotificationsModule {}
