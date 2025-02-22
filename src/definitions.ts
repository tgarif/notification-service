import { NotificationChannel, NotificationType } from './shared/enums/notification.enums';
import { SupportedChannelsType } from './shared/types/notification.types';

export const SUPPORTED_CHANNELS: SupportedChannelsType[] = [
  {
    type: NotificationType.LEAVE_BALANCE_REMINDER,
    channels: [NotificationChannel.UI],
  },
  {
    type: NotificationType.MONTHLY_PAYSLIP,
    channels: [NotificationChannel.EMAIL],
  },
  {
    type: NotificationType.HAPPY_BIRTHDAY,
    channels: [NotificationChannel.EMAIL, NotificationChannel.UI],
  },
];
