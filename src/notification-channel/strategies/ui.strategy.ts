import { Injectable } from '@nestjs/common';
import { NotificationChannelStrategy } from '../notification-channel-strategy.interface';
import { SentNotificationData, NotificationMessage } from 'src/shared/types/notification.types';

@Injectable()
export class UINotificationStrategy implements NotificationChannelStrategy {
  async sendNotification(
    userId: string,
    { content }: NotificationMessage,
  ): Promise<SentNotificationData> {
    const formattedMessage = `🖥️ UI notification for ${userId}: "${content}"`;

    return {
      formattedMessage,
      originalContent: content,
    };
  }
}
