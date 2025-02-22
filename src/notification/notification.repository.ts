import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './schemas/notification.schema';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel(Notification.name) private readonly model: Model<NotificationDocument>,
  ) {}

  async create(notificationData: Partial<Notification>): Promise<NotificationDocument> {
    return this.model.create(notificationData);
  }

  async findByUserIdAndChannel(userId: string, channel: string): Promise<NotificationDocument[]> {
    return this.model.find({ userId, channel }).sort({ createdAt: -1 }).exec();
  }
}
