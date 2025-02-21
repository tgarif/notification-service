import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: new ConsoleLogger({
      prefix: 'NotificationService',
    }),
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  // NOTE: In production, we may want to add helmet for HTTP security headers

  const configService = app.get(ConfigService);

  const port = configService.get<number>('APP_PORT', 3000);

  await app.listen(port);
  Logger.log(`Application is running on: http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
