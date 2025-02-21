import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { NotificationType } from 'src/shared/notification-types';

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
