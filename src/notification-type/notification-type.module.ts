import { Module } from '@nestjs/common';
import { NotificationTypeFactory } from './notification-type-factory';
import { LeaveBalanceReminderStrategy } from './strategies/leave-balance-reminder.strategy';
import { MonthlyPayslipStrategy } from './strategies/monthly-payslip.strategy';
import { HappyBirthdayStrategy } from './strategies/happy-birthday.strategy';

@Module({
  providers: [
    NotificationTypeFactory,
    LeaveBalanceReminderStrategy,
    MonthlyPayslipStrategy,
    HappyBirthdayStrategy,
  ],
  exports: [NotificationTypeFactory],
})
export class NotificationTypeModule {}
