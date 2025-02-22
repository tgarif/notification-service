import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { NotificationModule } from './notification/notification.module';
import { NotificationChannelModule } from './notification-channel/notification-channel.module';
import { NotificationTemplateModule } from './notification-template/notification-template.module';
import { MockModule } from './mock/mock.module';
import { RequestIdMiddleware } from './shared/core/request-id.middleware';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './shared/core/response.interceptor';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpExceptionFilter } from './shared/core/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        APP_PORT: Joi.number().port(),
        MONGO_URI: Joi.string().uri(),
      }),
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow('MONGO_URI'),
      }),
    }),
    NotificationModule,
    NotificationChannelModule,
    NotificationTemplateModule,
    MockModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
