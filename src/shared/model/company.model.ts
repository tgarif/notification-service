import { NotificationChannel } from '../notification-channels';

export interface Company {
  companyId: string;
  companyName: string;
  settings: Record<NotificationChannel, boolean>;
}
