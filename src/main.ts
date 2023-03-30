import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import {
  DefaultExceptionFilter,
  HttpExceptionFilter,
  shutdown,
} from '@/libs/nest';
import { ApiUsersModule } from './apps/api-users/infra/nest/modules/api_users.module';

function openapi(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Node Leap')
    .setDescription('The Node Leap API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  SwaggerModule.setup('api', app, document, customOptions);
}

let app: INestApplication = null;

async function bootstrap() {
  app = await NestFactory.create(ApiUsersModule);

  const configService = app.get(ConfigService);

  const appPort = configService.get<number>('API_PORT', 3000);
  const appEnv = configService.get<string>('NODE_ENV', 'local');

  // Build OpenAPI server.
  if (appEnv !== 'production') {
    openapi(app);
  }

  app.useGlobalFilters(new DefaultExceptionFilter(), new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  // Enable graceful shutdown
  app.enableShutdownHooks();

  await app.listen(appPort);
}

bootstrap().catch((error) => shutdown(app, error));
