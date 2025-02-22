import { NotificationRepository } from './notification.repository';
import { NotificationDocument } from './schemas/notification.schema';
import { NotificationChannel, NotificationType } from 'src/shared/enums/notification.enums';
import mongoose, { Model } from 'mongoose';

describe('NotificationRepository', () => {
  let repository: NotificationRepository;
  let model: jest.Mocked<Model<NotificationDocument>>;

  beforeEach(async () => {
    model = {
      create: jest.fn(),
      find: jest.fn(),
    } as any;

    repository = new NotificationRepository(model);
  });

  it('should create a notification', async () => {
    const mockNotification: Partial<NotificationDocument> = {
      userId: '123',
      companyId: '456',
      type: NotificationType.MONTHLY_PAYSLIP,
      channel: NotificationChannel.EMAIL,
      content: 'Test Content',
      subject: 'Test Subject',
      formattedMessage: 'Formatted Message',
    };

    model.create.mockImplementation(async (data: any) => ({
      ...data,
      _id: new mongoose.Types.ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      toObject: jest.fn().mockReturnThis(),
    }));

    const result = await repository.create(mockNotification as NotificationDocument);

    expect(model.create).toHaveBeenCalledWith(mockNotification);
    expect(result).toHaveProperty('_id');
    expect(result.userId).toBe('123');
  });
});
