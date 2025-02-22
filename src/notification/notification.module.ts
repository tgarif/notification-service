import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema, Notification } from './schemas/notification.schema';
import { NotificationRepository } from './notification.repository';
import { NotificationService } from './notification.service';
import { NotificationChannelModule } from 'src/notification-channel/notification-channel.module';
import { NotificationTemplateModule } from 'src/notification-template/notification-template.module';
import { MockModule } from 'src/mock/mock.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
    NotificationChannelModule,
    NotificationTemplateModule,
    MockModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationRepository, NotificationService],
  exports: [NotificationRepository],
})
export class NotificationModule {}
