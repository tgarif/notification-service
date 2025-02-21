import { Module } from '@nestjs/common';
import { NotificationChannelFactory } from './notification-channel-factory';
import { EmailNotificationStrategy } from './strategies/email.strategy';
import { UINotificationStrategy } from './strategies/ui.strategy';
import { NotificationStorageModule } from 'src/notification-storage/notification-storage.module';

@Module({
  imports: [NotificationStorageModule],
  providers: [NotificationChannelFactory, EmailNotificationStrategy, UINotificationStrategy],
  exports: [NotificationChannelFactory],
})
export class NotificationChannelModule {}
