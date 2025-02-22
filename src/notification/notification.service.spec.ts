import { MockUserService } from 'src/mock/mock-user.service';
import { NotificationService } from './notification.service';
import { MockCompanyService } from 'src/mock/mock-company.service';
import { NotificationRepository } from './notification.repository';
import { NotificationChannelFactory } from 'src/notification-channel/notification-channel-factory';
import { NotificationTemplateService } from 'src/notification-template/notification-template.service';
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationChannel, NotificationType } from 'src/shared/enums/notification.enums';
import { NotificationDocument } from './schemas/notification.schema';
import mongoose from 'mongoose';

describe('NotificationService', () => {
  let service: NotificationService;
  let mockUserService: jest.Mocked<MockUserService>;
  let mockCompanyService: jest.Mocked<MockCompanyService>;
  let notificationRepository: jest.Mocked<NotificationRepository>;
  let notificationChannelFactory: jest.Mocked<NotificationChannelFactory>;
  let notificationTemplateService: jest.Mocked<NotificationTemplateService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: NotificationRepository,
          useValue: {
            create: jest.fn(),
            findByUserIdAndChannel: jest.fn(),
          },
        },
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

    service = module.get<NotificationService>(NotificationService);
    notificationRepository = module.get(NotificationRepository);
    notificationChannelFactory = module.get(NotificationChannelFactory);
    notificationTemplateService = module.get(NotificationTemplateService);
    mockUserService = module.get(MockUserService);
    mockCompanyService = module.get(MockCompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send a notification if user is subscribed', async () => {
    mockUserService.getUserData.mockResolvedValue({
      userId: 'userId1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@company.com',
      phone: '123456790',
      leaveBalance: { leaveDays: 10 },
      payslip: { month: 'February' },
      settings: {
        [NotificationChannel.EMAIL]: true,
        [NotificationChannel.UI]: false,
      },
    });
    mockCompanyService.getCompanyData.mockResolvedValue({
      companyId: 'companyId1',
      companyName: 'Test Corp',
      settings: {
        [NotificationChannel.EMAIL]: true,
        [NotificationChannel.UI]: false,
      },
    });

    const strategyMock = {
      sendNotification: jest.fn().mockResolvedValue({
        formattedMessage: 'Formatted message',
        originalSubject: 'Subject',
        originalContent: 'Content',
      }),
    };

    notificationChannelFactory.getStrategy.mockReturnValue(strategyMock);
    notificationTemplateService.getTemplate.mockReturnValue({
      subject: 'Subject',
      content: 'Content',
    });

    const mockNotification: Partial<NotificationDocument> = {
      _id: new mongoose.Types.ObjectId(),
      userId: 'userId1',
      companyId: 'companyId1',
      type: NotificationType.MONTHLY_PAYSLIP,
      channel: NotificationChannel.EMAIL,
      content: 'Content',
      subject: 'Subject',
      formattedMessage: 'Formatted message',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    notificationRepository.create.mockResolvedValue(mockNotification as NotificationDocument);

    const result = await service.sendNotification(
      'companyId1',
      'userId1',
      NotificationType.MONTHLY_PAYSLIP,
    );

    expect(strategyMock.sendNotification).toHaveBeenCalled();
    expect(notificationRepository.create).toHaveBeenCalled();
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(mockNotification.id);
  });

  it('should NOT send a notification if user is NOT subscribed', async () => {
    mockUserService.getUserData.mockResolvedValue({
      userId: 'userId1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@company.com',
      phone: '123456790',
      leaveBalance: { leaveDays: 10 },
      payslip: { month: 'February' },
      settings: {
        [NotificationChannel.EMAIL]: false,
        [NotificationChannel.UI]: false,
      },
    });
    mockCompanyService.getCompanyData.mockResolvedValue({
      companyId: 'companyId1',
      companyName: 'Test Corp',
      settings: {
        [NotificationChannel.EMAIL]: false,
        [NotificationChannel.UI]: false,
      },
    });

    const strategyMock = { sendNotification: jest.fn() };
    notificationChannelFactory.getStrategy.mockReturnValue(strategyMock);

    const result = await service.sendNotification(
      'companyId1',
      'userId1',
      NotificationType.MONTHLY_PAYSLIP,
    );

    expect(strategyMock.sendNotification).not.toHaveBeenCalled();
    expect(notificationRepository.create).not.toHaveBeenCalled();
    expect(result).toHaveLength(0);
  });
});
