import { Injectable } from '@nestjs/common';
import { NotificationChannel } from 'src/shared/notification-channels';

@Injectable()
export class NotificationStorageService {
  private notifications: Map<NotificationChannel, Record<string, string[]>> = new Map();

  constructor() {
    Object.values(NotificationChannel).forEach((channel) => {
      this.notifications.set(channel, {});
    });
  }

  storeNotification(userId: string, channel: NotificationChannel, message: string): void {
    const channelStorage = this.notifications.get(channel);
    if (!channelStorage) return;

    if (!channelStorage[userId]) {
      channelStorage[userId] = [];
    }
    channelStorage[userId].push(message);
  }

  getNotifications(userId: string, channel: NotificationChannel): string[] {
    return this.notifications.get(channel)?.[userId] ?? [];
  }
}
