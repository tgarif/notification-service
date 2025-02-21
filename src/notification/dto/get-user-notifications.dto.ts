import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { NotificationChannel } from 'src/shared/notification-channels';

export class GetUserNotificationDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsEnum(NotificationChannel)
  @IsNotEmpty()
  channel: NotificationChannel;
}
