import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { NotificationChannel, NotificationType } from 'src/shared/enums/notification.enums';

export class GetUserNotificationDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsEnum(NotificationChannel)
  @IsNotEmpty()
  channel: NotificationChannel;
}

export class GetUserNotificationsResponseDto {
  notificationId: string;
  userId: string;
  companyId: string;
  type: NotificationType;
  channel: NotificationChannel;
  content: string;
  formattedMessage: string;
  createdAt: string;
  updatedAt: string;
}
