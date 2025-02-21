import { Module } from '@nestjs/common';
import { NotificationStorageModule } from 'src/notification-storage/notification-storage.module';
import { NotificationController } from './notification.controller';
import { NotificationDispatcherModule } from 'src/notification-dispatcher/notification-dispatcher.module';

@Module({
  imports: [NotificationDispatcherModule, NotificationStorageModule],
  controllers: [NotificationController],
})
export class NotificationModule {}
