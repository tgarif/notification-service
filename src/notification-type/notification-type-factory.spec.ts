import { Test, TestingModule } from '@nestjs/testing';
import { NotificationTypeFactory } from './notification-type-factory';
import { LeaveBalanceReminderStrategy } from './strategies/leave-balance-reminder.strategy';
import { MonthlyPayslipStrategy } from './strategies/monthly-payslip.strategy';
import { HappyBirthdayStrategy } from './strategies/happy-birthday.strategy';
import { NotificationType } from 'src/shared/notification-types';

describe('NotificationTypeFactory', () => {
  let factory: NotificationTypeFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationTypeFactory,
        LeaveBalanceReminderStrategy,
        MonthlyPayslipStrategy,
        HappyBirthdayStrategy,
      ],
    }).compile();

    factory = module.get<NotificationTypeFactory>(NotificationTypeFactory);
  });

  it('should be defined', () => {
    expect(factory).toBeDefined();
  });

  it('should return LeaveBalanceReminderStrategy for LEAVE_BALANCE_REMINDER', () => {
    const strategy = factory.getStrategy(NotificationType.LEAVE_BALANCE_REMINDER);
    expect(strategy).toBeInstanceOf(LeaveBalanceReminderStrategy);
  });

  it('should return MonthlyPayslipStrategy for MONTHLY_PAYSLIP', () => {
    const strategy = factory.getStrategy(NotificationType.MONTHLY_PAYSLIP);
    expect(strategy).toBeInstanceOf(MonthlyPayslipStrategy);
  });

  it('should return HappyBirthdayStrategy for HAPPY_BIRTHDAY', () => {
    const strategy = factory.getStrategy(NotificationType.HAPPY_BIRTHDAY);
    expect(strategy).toBeInstanceOf(HappyBirthdayStrategy);
  });

  it('should throw an error for an unsupported notification type', () => {
    expect(() => factory.getStrategy('invalid-type' as NotificationType)).toThrow(
      'No strategy found for notification type: invalid-type',
    );
  });
});
