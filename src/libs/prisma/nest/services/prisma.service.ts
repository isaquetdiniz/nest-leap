import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaConfig } from '@/libs/prisma';
import { ConfigService } from '@nestjs/config';
import { MissingEnvVarException } from '@/core/application';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly configService: ConfigService<PrismaConfig>) {
    super();

    const url = this.configService.get('DATABASE_URL');

    if (!url) {
      throw new MissingEnvVarException(['DATABASE_URL']);
    }
  }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
