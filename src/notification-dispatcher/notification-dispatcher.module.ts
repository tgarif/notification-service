import { Module } from '@nestjs/common';
import { MockModule } from 'src/mock/mock.module';
import { NotificationChannelModule } from 'src/notification-channel/notification-channel.module';
import { NotificationTemplateModule } from 'src/notification-template/notification-template.module';
import { NotificationTypeModule } from 'src/notification-type/notification-type.module';
import { NotificationDispatcherService } from './notification-dispatcher.service';

@Module({
  imports: [
    NotificationChannelModule,
    NotificationTypeModule,
    NotificationTemplateModule,
    MockModule,
  ],
  providers: [NotificationDispatcherService],
  exports: [NotificationDispatcherService],
})
export class NotificationDispatcherModule {}
