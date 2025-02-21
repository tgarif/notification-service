import { Injectable } from '@nestjs/common';
import { NotificationTypeStrategy } from '../notification-type-strategy.interface';
import { NotificationChannel } from 'src/shared/notification-channels';

@Injectable()
export class HappyBirthdayStrategy implements NotificationTypeStrategy {
  getChannels(): NotificationChannel[] {
    return [NotificationChannel.EMAIL, NotificationChannel.UI];
  }
}
