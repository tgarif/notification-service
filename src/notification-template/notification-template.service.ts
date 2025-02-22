import { Injectable } from '@nestjs/common';
import { TEMPLATES } from './templates';
import { NotificationTemplate } from './notification-template.interface';
import { NotificationChannel, NotificationType } from 'src/shared/enums/notification.enums';
import { renderTemplate } from 'src/shared/utils/template-helper.util';
import { NotificationMessage, TemplateData } from 'src/shared/types/notification.types';

@Injectable()
export class NotificationTemplateService {
  getTemplate(
    type: NotificationType,
    channel: NotificationChannel,
    data: TemplateData,
  ): NotificationMessage {
    const template: NotificationTemplate[NotificationChannel] | undefined =
      TEMPLATES[type]?.[channel];

    if (!template) {
      throw new Error(`Template not found for type ${type} and channel ${channel}`);
    }

    return {
      subject: template.subject ? renderTemplate(template.subject, data) : undefined,
      content: renderTemplate(template.content, data),
    };
  }
}
