import { SentNotificationData, NotificationMessage } from 'src/shared/types/notification.types';

export interface NotificationChannelStrategy {
  sendNotification(userId: string, message: NotificationMessage): Promise<SentNotificationData>;
}
