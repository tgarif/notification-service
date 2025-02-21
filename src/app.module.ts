import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { NotificationModule } from './notification/notification.module';
import { NotificationDispatcherModule } from './notification-dispatcher/notification-dispatcher.module';
import { NotificationChannelModule } from './notification-channel/notification-channel.module';
import { NotificationTypeModule } from './notification-type/notification-type.module';
import { NotificationTemplateModule } from './notification-template/notification-template.module';
import { NotificationStorageModule } from './notification-storage/notification-storage.module';
import { MockModule } from './mock/mock.module';
import { RequestIdMiddleware } from './shared/middleware/request-id.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './shared/interceptor/response.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        APP_PORT: Joi.number().port(),
      }),
      isGlobal: true,
    }),
    NotificationModule,
    NotificationDispatcherModule,
    NotificationChannelModule,
    NotificationTypeModule,
    NotificationTemplateModule,
    NotificationStorageModule,
    MockModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
