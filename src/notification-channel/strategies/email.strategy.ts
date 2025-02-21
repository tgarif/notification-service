import { Injectable } from '@nestjs/common';
import { NotificationChannelStrategy } from '../notification-channel-strategy.interface';
import { NotificationStorageService } from 'src/notification-storage/notification-storage.service';
import { NotificationChannel } from 'src/shared/notification-channels';

@Injectable()
export class EmailNotificationStrategy implements NotificationChannelStrategy {
  constructor(private readonly notificationStorageService: NotificationStorageService) {}

  sendNotification(userId: string, message: { subject?: string; content: string }): string {
    const notificationMessage = `📧 Email sent to ${userId} | Subject: "${message.subject}" | Content: "${message.content}"`;
    this.notificationStorageService.storeNotification(
      userId,
      NotificationChannel.EMAIL,
      notificationMessage,
    );
    return notificationMessage;
  }
}
