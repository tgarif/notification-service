import { NotificationChannel } from 'src/shared/enums/notification.enums';
import { NotificationTemplate } from '../notification-template.interface';

export const HappyBirthdayTemplates: NotificationTemplate = {
  [NotificationChannel.EMAIL]: {
    subject: 'Happy Birthday {{firstName}}!',
    content: '{{companyName}} is wishing you a happy birthday!',
  },
  [NotificationChannel.UI]: {
    content: 'Happy Birthday {{firstName}}',
  },
};
