import { NotificationChannel, NotificationType } from '../enums/notification.enums';

export interface SupportedChannelsType {
  type: NotificationType;
  channels: NotificationChannel[];
}

export interface NotificationMessage {
  subject?: string;
  content: string;
}

export interface SentNotificationData {
  formattedMessage: string;
  originalSubject?: string;
  originalContent: string;
}

export interface TemplateData {
  firstName: string;
  companyName: string;
  leaveDays: number;
  month: string;
}
