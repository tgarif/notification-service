import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { NotificationChannel, NotificationType } from 'src/shared/enums/notification.enums';

export class SendNotificationDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  companyId: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsEnum(NotificationType)
  @IsNotEmpty()
  type: NotificationType;
}

export class SendNotificationResponseDto {
  notificationId: string;
  userId: string;
  companyId: string;
  type: NotificationType;
  channel: NotificationChannel;
  content: string;
  subject?: string;
  formattedMessage: string;
  createdAt: string;
  updatedAt: string;
}
