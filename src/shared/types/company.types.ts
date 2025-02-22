import { NotificationChannel } from '../enums/notification.enums';

export interface Company {
  companyId: string;
  companyName: string;
  settings: Record<NotificationChannel, boolean>;
}
