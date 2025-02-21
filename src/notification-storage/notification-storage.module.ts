import { Module } from '@nestjs/common';
import { NotificationStorageService } from './notification-storage.service';

@Module({
  providers: [NotificationStorageService],
  exports: [NotificationStorageService],
})
export class NotificationStorageModule {}
