import { Injectable } from '@nestjs/common';
import { NotificationChannelStrategy } from '../notification-channel-strategy.interface';
import { SentNotificationData, NotificationMessage } from 'src/shared/types/notification.types';

@Injectable()
export class EmailNotificationStrategy implements NotificationChannelStrategy {
  async sendNotification(
    userId: string,
    { subject, content }: NotificationMessage,
  ): Promise<SentNotificationData> {
    if (!subject) {
      throw new Error('Subject is required for email notification');
    }

    const formattedMessage = `📧 Email sent to ${userId} | Subject: "${subject}" | Content: "${content}"`;

    return {
      formattedMessage,
      originalSubject: subject,
      originalContent: content,
    };
  }
}
