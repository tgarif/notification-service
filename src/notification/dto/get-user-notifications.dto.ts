import { IsEnum, IsString, IsUUID } from 'class-validator';
import { NotificationChannel } from 'src/shared/notification-channels';

export class GetUserNotificationDto {
  @IsString()
  @IsUUID()
  userId: string;

  @IsEnum(NotificationChannel)
  channel: NotificationChannel;
}
