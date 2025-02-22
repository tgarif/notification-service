import { HappyBirthdayTemplates } from './happy-birthday.template';
import { NotificationTemplate } from '../notification-template.interface';
import { LeaveBalanceReminderTemplates } from './leave-balance-reminder.template';
import { MonthlyPayslipTemplates } from './monthly-payslip.template';
import { NotificationType } from 'src/shared/enums/notification.enums';

export const TEMPLATES: Record<NotificationType, NotificationTemplate> = {
  [NotificationType.HAPPY_BIRTHDAY]: HappyBirthdayTemplates,
  [NotificationType.LEAVE_BALANCE_REMINDER]: LeaveBalanceReminderTemplates,
  [NotificationType.MONTHLY_PAYSLIP]: MonthlyPayslipTemplates,
};
