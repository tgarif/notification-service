import { NotificationChannel } from 'src/shared/notification-channels';
import { NotificationTemplate } from '../notification-template.interface';

export const LeaveBalanceReminderTemplates: NotificationTemplate = {
  [NotificationChannel.EMAIL]: {
    subject: 'Reminder, Your Leave Balance',
    content: 'Hello {{firstName}}, you have {{leaveDays}} leave days remaining. Plan accordingly!',
  },
  [NotificationChannel.UI]: {
    content: 'Reminder: You have {{leaveDays}} leave days left.',
  },
};
