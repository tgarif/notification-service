import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationDispatcherService } from 'src/notification-dispatcher/notification-dispatcher.service';
import { SendNotificationDto } from './dto/send-notification.dto';
import { GetUserNotificationDto } from './dto/get-user-notifications.dto';
import { NotificationStorageService } from 'src/notification-storage/notification-storage.service';

@Controller({
  path: 'notification',
  version: '1',
})
@UsePipes(new ValidationPipe({ transform: true }))
export class NotificationController {
  constructor(
    private readonly notificationDispatcher: NotificationDispatcherService,
    private readonly notificationStorageService: NotificationStorageService,
  ) {}

  @Post('send')
  sendNotification(@Body() sendNotificationDto: SendNotificationDto): Promise<string[]> {
    const { companyId, userId, type } = sendNotificationDto;
    return this.notificationDispatcher.sendNotification(companyId, userId, type);
  }

  @Get(':userId/:channel')
  getUserNotification(@Param() params: GetUserNotificationDto): string[] {
    const { userId, channel } = params;
    return this.notificationStorageService.getNotifications(userId, channel);
  }
}
