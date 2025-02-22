import { NotificationController } from './notification.controller';
import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { SendNotificationDto } from './dto/send-notification.dto';
import { GetUserNotificationsDto } from './dto/get-user-notifications.dto';
import { NotificationChannel, NotificationType } from 'src/shared/enums/notification.enums';
import { NotificationService } from './notification.service';
import { NotificationDocument } from './schemas/notification.schema';
import mongoose from 'mongoose';

describe('NotificationController', () => {
  let controller: NotificationController;
  let notificationService: jest.Mocked<NotificationService>;
  let validationPipe: ValidationPipe;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [
        {
          provide: NotificationService,
          useValue: {
            sendNotification: jest.fn(),
            getUserNotifications: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
    notificationService = module.get(NotificationService);
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

    const mockNotification: Partial<NotificationDocument> = {
      _id: new mongoose.Types.ObjectId(),
      userId: dto.userId,
      companyId: dto.companyId,
      type: dto.type,
      channel: NotificationChannel.EMAIL,
      content: 'Content',
      subject: 'Subject',
      formattedMessage: 'Formatted message',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    notificationService.sendNotification.mockResolvedValue([
      mockNotification as NotificationDocument,
    ]);

    const result = await controller.sendNotification(dto);

    expect(notificationService.sendNotification).toHaveBeenCalledWith(
      dto.companyId,
      dto.userId,
      dto.type,
    );
    expect(result).toHaveLength(1);
    expect(result[0].notificationId).toBe(mockNotification.id);
  });

  it('should return UI notifications from notification service', async () => {
    const params: GetUserNotificationsDto = {
      userId: '550e8400-e29b-41d4-a716-446655440000',
      channel: NotificationChannel.UI,
    };

    const mockNotification: Partial<NotificationDocument> = {
      _id: new mongoose.Types.ObjectId(),
      userId: params.userId,
      companyId: '550e8400-e29b-41d4-a716-446655440999',
      type: NotificationType.HAPPY_BIRTHDAY,
      channel: NotificationChannel.UI,
      content: 'Content',
      subject: 'Subject',
      formattedMessage: 'Formatted message',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    notificationService.getUserNotifications.mockResolvedValue([
      mockNotification as NotificationDocument,
    ]);

    const result = await controller.getUserNotifications(params);

    expect(notificationService.getUserNotifications).toHaveBeenCalledWith(
      params.userId,
      params.channel,
    );
    expect(result).toHaveLength(1);
    expect(result[0].notificationId).toBe(mockNotification.id);
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
    const invalidDto = plainToInstance(GetUserNotificationsDto, {
      channel: NotificationChannel.UI,
    });

    await expect(
      validationPipe.transform(invalidDto, { type: 'param', metatype: GetUserNotificationsDto }),
    ).rejects.toThrow();
  });

  it('should fail validation when channel in `GetUserNotificationDto` is missing', async () => {
    const invalidDto = plainToInstance(GetUserNotificationsDto, {
      userId: '550e8400-e29b-41d4-a716-446655440000',
    });

    await expect(
      validationPipe.transform(invalidDto, { type: 'param', metatype: GetUserNotificationsDto }),
    ).rejects.toThrow();
  });
});
