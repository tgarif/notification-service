import { NotificationChannel } from 'src/shared/enums/notification.enums';

export const MonthlyPayslipTemplates = {
  [NotificationChannel.EMAIL]: {
    subject: 'Your Monthly Payslip is Ready',
    content:
      'Hello {{firstName}}, your payslip for {{month}} is now available. Check your email for details.',
  },
};
