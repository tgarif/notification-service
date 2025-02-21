import { IsEnum, IsString, IsUUID } from 'class-validator';
import { NotificationType } from 'src/shared/notification-types';

export class SendNotificationDto {
  @IsString()
  @IsUUID()
  companyId: string;

  @IsString()
  @IsUUID()
  userId: string;

  @IsEnum(NotificationType)
  type: NotificationType;
}
