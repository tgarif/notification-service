import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import { NotificationChannel, NotificationType } from 'src/shared/enums/notification.enums';

export type NotificationDocument = HydratedDocument<Notification> & {
  createdAt: Date;
  updatedAt: Date;
};

@Schema({ timestamps: true })
export class Notification extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  companyId: string;

  @Prop({ required: true, enum: Object.values(NotificationType) })
  type: NotificationType;

  @Prop({ required: true, enum: Object.values(NotificationChannel) })
  channel: NotificationChannel;

  @Prop()
  subject?: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  formattedMessage: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
