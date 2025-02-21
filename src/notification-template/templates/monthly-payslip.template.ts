import { NotificationChannel } from '../../shared/notification-channels';

export const MonthlyPayslipTemplates = {
  [NotificationChannel.EMAIL]: {
    subject: 'Your Monthly Payslip is Ready',
    content:
      'Hello {{firstName}}, your payslip for {{month}} is now available. Check your email for details.',
  },
  [NotificationChannel.UI]: {
    content: 'Your payslip for {{month}} is now available.',
  },
};
