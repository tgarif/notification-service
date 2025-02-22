import { NotificationChannel } from 'src/shared/enums/notification.enums';
import { NotificationMessage } from 'src/shared/types/notification.types';

export type NotificationTemplate = {
  [channel in NotificationChannel]?: NotificationMessage;
};
