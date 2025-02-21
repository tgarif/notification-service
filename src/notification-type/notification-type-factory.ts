import { Injectable } from '@nestjs/common';
import { NotificationType } from 'src/shared/notification-types';
import { NotificationTypeStrategy } from './notification-type-strategy.interface';
import { LeaveBalanceReminderStrategy } from './strategies/leave-balance-reminder.strategy';
import { MonthlyPayslipStrategy } from './strategies/monthly-payslip.strategy';
import { HappyBirthdayStrategy } from './strategies/happy-birthday.strategy';

@Injectable()
export class NotificationTypeFactory {
  private strategies = new Map<NotificationType, NotificationTypeStrategy>();

  constructor(
    leaveBalanceReminder: LeaveBalanceReminderStrategy,
    monthlyPayslip: MonthlyPayslipStrategy,
    happyBirthday: HappyBirthdayStrategy,
  ) {
    this.strategies.set(NotificationType.LEAVE_BALANCE_REMINDER, leaveBalanceReminder);
    this.strategies.set(NotificationType.MONTHLY_PAYSLIP, monthlyPayslip);
    this.strategies.set(NotificationType.HAPPY_BIRTHDAY, happyBirthday);
  }

  getStrategy(type: NotificationType): NotificationTypeStrategy {
    const strategy = this.strategies.get(type);
    if (!strategy) {
      throw new Error(`No strategy found for notification type: ${type}`);
    }
    return strategy;
  }
}
