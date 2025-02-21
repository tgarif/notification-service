import { Test, TestingModule } from '@nestjs/testing';
import { EmailNotificationStrategy } from './strategies/email.strategy';
import { UINotificationStrategy } from './strategies/ui.strategy';
import { NotificationChannelFactory } from './notification-channel-factory';
import { NotificationChannel } from 'src/shared/notification-channels';
import { NotificationStorageService } from 'src/notification-storage/notification-storage.service';

describe('NotificationChannelFactory', () => {
  let factory: NotificationChannelFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationChannelFactory,
        EmailNotificationStrategy,
        UINotificationStrategy,
        { provide: NotificationStorageService, useValue: { storeNotification: jest.fn() } },
      ],
    }).compile();

    factory = module.get<NotificationChannelFactory>(NotificationChannelFactory);
  });

  it('should be defined', () => {
    expect(factory).toBeDefined();
  });

  it('should return EmailNotificationStrategy for email channel', () => {
    expect(factory.getStrategy(NotificationChannel.EMAIL)).toBeInstanceOf(
      EmailNotificationStrategy,
    );
  });

  it('should return UINotificationStrategy for UI channel', () => {
    expect(factory.getStrategy(NotificationChannel.UI)).toBeInstanceOf(UINotificationStrategy);
  });

  it('should throw an error for unsupported channel', () => {
    expect(() => factory.getStrategy('sms' as NotificationChannel)).toThrow(
      'Unsupported notification channel: sms',
    );
  });
});
