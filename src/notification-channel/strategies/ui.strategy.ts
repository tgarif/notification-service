import { Injectable } from '@nestjs/common';
import { NotificationChannelStrategy } from '../notification-channel-strategy.interface';
import { NotificationStorageService } from 'src/notification-storage/notification-storage.service';
import { NotificationChannel } from 'src/shared/notification-channels';

@Injectable()
export class UINotificationStrategy implements NotificationChannelStrategy {
  constructor(private readonly notificationStorageService: NotificationStorageService) {}

  sendNotification(userId: string, message: { content: string }): string {
    const notificationMessage = `🖥️ UI notification for ${userId}: "${message.content}"`;
    this.notificationStorageService.storeNotification(
      userId,
      NotificationChannel.UI,
      notificationMessage,
    );
    return notificationMessage;
  }
}
