export interface NotificationChannelStrategy {
  sendNotification(userId: string, message: { subject?: string; content: string }): string;
}
