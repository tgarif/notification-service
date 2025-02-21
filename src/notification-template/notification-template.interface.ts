import { NotificationChannel } from 'src/shared/notification-channels';

export type NotificationTemplate = {
  [channel in NotificationChannel]?: {
    subject?: string;
    content: string;
  };
};
