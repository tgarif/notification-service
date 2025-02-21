import { NotificationDispatcherService } from 'src/notification-dispatcher/notification-dispatcher.service';
import { NotificationController } from './notification.controller';
import { NotificationStorageService } from 'src/notification-storage/notification-storage.service';
import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { SendNotificationDto } from './dto/send-notification.dto';
import { NotificationType } from 'src/shared/notification-types';
import { GetUserNotificationDto } from './dto/get-user-notifications.dto';
import { NotificationChannel } from 'src/shared/notification-channels';

describe('NotificationController', () => {
  let controller: NotificationController;
  let notificationDispatcherService: NotificationDispatcherService;
  let notificationStorageService: NotificationStorageService;
  let validationPipe: ValidationPipe;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [
        {
          provide: NotificationDispatcherService,
          useValue: { sendNotification: jest.fn() },
        },
        {
          provide: NotificationStorageService,
          useValue: { getNotifications: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
    notificationDispatcherService = module.get<NotificationDispatcherService>(
      NotificationDispatcherService,
    );
    notificationStorageService = module.get<NotificationStorageService>(NotificationStorageService);

    validationPipe = new ValidationPipe({ transform: true });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call `sendNotification` in the dispatcher service', async () => {
    const dto: SendNotificationDto = {
      companyId: '550e8400-e29b-41d4-a716-446655440000',
      userId: '550e8400-e29b-41d4-a716-446655440111',
      type: NotificationType.MONTHLY_PAYSLIP,
    };

    (notificationDispatcherService.sendNotification as jest.Mock).mockResolvedValue(['email']);

    const result = await controller.sendNotification(dto);

    expect(notificationDispatcherService.sendNotification).toHaveBeenCalledWith(
      '550e8400-e29b-41d4-a716-446655440000',
      '550e8400-e29b-41d4-a716-446655440111',
      NotificationType.MONTHLY_PAYSLIP,
    );
    expect(result).toEqual(['email']);
  });

  it('should return UI notifications from storage service', () => {
    (notificationStorageService.getNotifications as jest.Mock).mockReturnValue([
      'UI Notification 1',
      'UI Notification 2',
    ]);

    const params: GetUserNotificationDto = {
      userId: '550e8400-e29b-41d4-a716-446655440000',
      channel: NotificationChannel.UI,
    };

    const result = controller.getUserNotification(params);

    expect(notificationStorageService.getNotifications).toHaveBeenCalledWith(
      '550e8400-e29b-41d4-a716-446655440000',
      NotificationChannel.UI,
    );
    expect(result).toEqual(['UI Notification 1', 'UI Notification 2']);
  });

  // --- DTO validation tests ---
  it('should fail validation when companyId is missing', async () => {
    const invalidDto = plainToInstance(SendNotificationDto, {
      userId: '550e8400-e29b-41d4-a716-446655440111',
      type: NotificationType.MONTHLY_PAYSLIP,
    });

    await expect(
      validationPipe.transform(invalidDto, { type: 'body', metatype: SendNotificationDto }),
    ).rejects.toThrow();
  });

  it('should fail validation when userId is missing', async () => {
    const invalidDto = plainToInstance(SendNotificationDto, {
      companyId: '550e8400-e29b-41d4-a716-446655440000',
      type: NotificationType.MONTHLY_PAYSLIP,
    });

    await expect(
      validationPipe.transform(invalidDto, { type: 'body', metatype: SendNotificationDto }),
    ).rejects.toThrow();
  });

  it('should fail validation when type is missing', async () => {
    const invalidDto = plainToInstance(SendNotificationDto, {
      companyId: '550e8400-e29b-41d4-a716-446655440000',
      userId: '550e8400-e29b-41d4-a716-446655440111',
    });

    await expect(
      validationPipe.transform(invalidDto, { type: 'body', metatype: SendNotificationDto }),
    ).rejects.toThrow();
  });

  it('should fail validation when userId in `GetUserNotificationDto` is missing', async () => {
    const invalidDto = plainToInstance(GetUserNotificationDto, {
      channel: NotificationChannel.UI,
    });

    await expect(
      validationPipe.transform(invalidDto, { type: 'param', metatype: GetUserNotificationDto }),
    ).rejects.toThrow();
  });

  it('should fail validation when channel in `GetUserNotificationDto` is missing', async () => {
    const invalidDto = plainToInstance(GetUserNotificationDto, {
      userId: '550e8400-e29b-41d4-a716-446655440000',
    });

    await expect(
      validationPipe.transform(invalidDto, { type: 'param', metatype: GetUserNotificationDto }),
    ).rejects.toThrow();
  });
});
