import { MockUserService } from 'src/mock/mock-user.service';
import { NotificationDispatcherService } from './notification-dispatcher.service';
import { MockCompanyService } from 'src/mock/mock-company.service';
import { NotificationChannelFactory } from 'src/notification-channel/notification-channel-factory';
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationChannel } from 'src/shared/notification-channels';
import { NotificationType } from 'src/shared/notification-types';
import { NotificationTypeFactory } from 'src/notification-type/notification-type-factory';
import { NotificationTemplateService } from 'src/notification-template/notification-template.service';
import { LeaveBalanceReminderStrategy } from 'src/notification-type/strategies/leave-balance-reminder.strategy';
import { MonthlyPayslipStrategy } from 'src/notification-type/strategies/monthly-payslip.strategy';
import { HappyBirthdayStrategy } from 'src/notification-type/strategies/happy-birthday.strategy';

describe('NotificationDispatcherService', () => {
  let service: NotificationDispatcherService;
  let mockUserService: MockUserService;
  let mockCompanyService: MockCompanyService;
  let notificationChannelFactory: NotificationChannelFactory;
  let notificationTypeFactory: NotificationTypeFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationDispatcherService,
        NotificationTypeFactory,
        LeaveBalanceReminderStrategy,
        MonthlyPayslipStrategy,
        HappyBirthdayStrategy,
        {
          provide: NotificationChannelFactory,
          useValue: { getStrategy: jest.fn() },
        },
        {
          provide: NotificationTemplateService,
          useValue: { getTemplate: jest.fn() },
        },
        {
          provide: MockUserService,
          useValue: { getUserData: jest.fn() },
        },
        {
          provide: MockCompanyService,
          useValue: { getCompanyData: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<NotificationDispatcherService>(NotificationDispatcherService);
    mockUserService = module.get<MockUserService>(MockUserService);
    mockCompanyService = module.get<MockCompanyService>(MockCompanyService);
    notificationChannelFactory = module.get<NotificationChannelFactory>(NotificationChannelFactory);
    notificationTypeFactory = module.get<NotificationTypeFactory>(NotificationTypeFactory);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send a notification if user is subscribed', async () => {
    (mockUserService.getUserData as jest.Mock).mockResolvedValue({
      userId: 'userId1',
      firstName: 'John',
      leaveBalance: { leaveDays: 10 },
      payslip: { month: 'February' },
      settings: {
        [NotificationChannel.EMAIL]: true,
      },
    });
    (mockCompanyService.getCompanyData as jest.Mock).mockResolvedValue({
      companyId: 'companyId1',
      companyName: 'Test Corp',
      settings: {
        [NotificationChannel.EMAIL]: true,
      },
    });

    const strategyMock = { sendNotification: jest.fn() };
    (notificationChannelFactory.getStrategy as jest.Mock).mockReturnValue(strategyMock);

    await service.sendNotification('companyId1', 'userId1', NotificationType.MONTHLY_PAYSLIP);

    expect(strategyMock.sendNotification).toHaveBeenCalled();
  });

  it('should NOT send a notification if user is NOT subscribed', async () => {
    (mockUserService.getUserData as jest.Mock).mockResolvedValue({
      userId: 'userId1',
      firstName: 'John',
      leaveBalance: { leaveDays: 10 },
      payslip: { month: 'February' },
      settings: {
        [NotificationChannel.EMAIL]: false,
      },
    });
    (mockCompanyService.getCompanyData as jest.Mock).mockResolvedValue({
      companyId: 'companyId1',
      companyName: 'Test Corp',
      settings: {
        [NotificationChannel.EMAIL]: false,
      },
    });

    const strategyMock = { sendNotification: jest.fn() };
    (notificationChannelFactory.getStrategy as jest.Mock).mockReturnValue(strategyMock);

    await service.sendNotification('companyId1', 'userId1', NotificationType.MONTHLY_PAYSLIP);

    expect(strategyMock.sendNotification).not.toHaveBeenCalled();
  });
});
