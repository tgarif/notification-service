import { Module } from '@nestjs/common';
import { NotificationChannelFactory } from './notification-channel-factory';
import { EmailNotificationStrategy } from './strategies/email.strategy';
import { UINotificationStrategy } from './strategies/ui.strategy';

@Module({
  providers: [NotificationChannelFactory, EmailNotificationStrategy, UINotificationStrategy],
  exports: [NotificationChannelFactory],
})
export class NotificationChannelModule {}
