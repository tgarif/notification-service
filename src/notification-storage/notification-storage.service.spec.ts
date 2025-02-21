import { Test, TestingModule } from '@nestjs/testing';
import { NotificationStorageService } from './notification-storage.service';
import { NotificationChannel } from 'src/shared/notification-channels';

describe('NotificationStorageService', () => {
  let service: NotificationStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationStorageService],
    }).compile();

    service = module.get<NotificationStorageService>(NotificationStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should store and retrieve a UI notification for a user', () => {
    service.storeNotification('userId1', NotificationChannel.UI, 'UI Notification 1');
    service.storeNotification('userId1', NotificationChannel.UI, 'UI Notification 2');

    expect(service.getNotifications('userId1', NotificationChannel.UI)).toEqual([
      'UI Notification 1',
      'UI Notification 2',
    ]);
  });

  it('should store and retrieve an Email notification for a user', () => {
    service.storeNotification('userId2', NotificationChannel.EMAIL, 'Email Notification 1');

    expect(service.getNotifications('userId2', NotificationChannel.EMAIL)).toEqual([
      'Email Notification 1',
    ]);
  });

  it('should return an empty array if no notifications exist for a user', () => {
    expect(service.getNotifications('userId3', NotificationChannel.UI)).toEqual([]);
  });

  it('should return an empty array if user has notifications but for a different channel', () => {
    service.storeNotification('userId4', NotificationChannel.EMAIL, 'Email Notification');

    expect(service.getNotifications('userId4', NotificationChannel.UI)).toEqual([]);
  });
});
