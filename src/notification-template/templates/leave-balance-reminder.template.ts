import { NotificationChannel } from 'src/shared/enums/notification.enums';
import { NotificationTemplate } from '../notification-template.interface';

export const LeaveBalanceReminderTemplates: NotificationTemplate = {
  [NotificationChannel.UI]: {
    content: 'Reminder: You have {{leaveDays}} leave days left.',
  },
};
