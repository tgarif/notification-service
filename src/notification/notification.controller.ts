import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { SendNotificationDto, SendNotificationResponseDto } from './dto/send-notification.dto';
import {
  GetUserNotificationDto,
  GetUserNotificationsResponseDto,
} from './dto/get-user-notifications.dto';
import { NotificationService } from './notification.service';

@Controller({
  path: 'notification',
  version: '1',
})
@UsePipes(new ValidationPipe({ transform: true }))
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send')
  async sendNotification(
    @Body() sendNotificationDto: SendNotificationDto,
  ): Promise<SendNotificationResponseDto[]> {
    const { companyId, userId, type } = sendNotificationDto;
    const sentNotifications = await this.notificationService.sendNotification(
      companyId,
      userId,
      type,
    );

    return sentNotifications.map((notification) => ({
      notificationId: notification.id,
      userId: notification.userId,
      companyId: notification.companyId,
      type: notification.type,
      channel: notification.channel,
      content: notification.content,
      subject: notification.subject,
      formattedMessage: notification.formattedMessage,
      createdAt: notification.createdAt.toISOString(),
      updatedAt: notification.updatedAt.toISOString(),
    }));
  }

  @Get(':userId/:channel')
  async getUserNotification(
    @Param() params: GetUserNotificationDto,
  ): Promise<GetUserNotificationsResponseDto[]> {
    const { userId, channel } = params;
    const notifications = await this.notificationService.getUserNotifications(userId, channel);

    return notifications.map((notification) => ({
      notificationId: notification.id,
      userId: notification.userId,
      companyId: notification.companyId,
      type: notification.type,
      channel: notification.channel,
      content: notification.content,
      formattedMessage: notification.formattedMessage,
      createdAt: notification.createdAt.toISOString(),
      updatedAt: notification.updatedAt.toISOString(),
    }));
  }
}
