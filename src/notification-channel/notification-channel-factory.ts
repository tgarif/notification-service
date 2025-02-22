import { Injectable } from '@nestjs/common';
import { EmailNotificationStrategy } from './strategies/email.strategy';
import { UINotificationStrategy } from './strategies/ui.strategy';
import { NotificationChannelStrategy } from './notification-channel-strategy.interface';
import { NotificationChannel } from 'src/shared/enums/notification.enums';

@Injectable()
export class NotificationChannelFactory {
  private strategies: Map<NotificationChannel, NotificationChannelStrategy>;

  constructor(
    private readonly emailStrategy: EmailNotificationStrategy,
    private readonly uiStrategy: UINotificationStrategy,
  ) {
    this.strategies = new Map<NotificationChannel, NotificationChannelStrategy>([
      [NotificationChannel.EMAIL, this.emailStrategy],
      [NotificationChannel.UI, this.uiStrategy],
    ]);
  }

  getStrategy(channel: NotificationChannel): NotificationChannelStrategy {
    const strategy = this.strategies.get(channel);
    if (!strategy) {
      throw new Error(`Unsupported notification channel: ${channel}`);
    }
    return strategy;
  }
}
