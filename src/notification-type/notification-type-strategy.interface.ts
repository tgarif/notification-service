import { NotificationChannel } from 'src/shared/notification-channels';

export interface NotificationTypeStrategy {
  getChannels(): NotificationChannel[];
}
