import { Injectable } from '@nestjs/common';
import { NotificationType } from 'src/shared/notification-types';
import { NotificationChannel } from 'src/shared/notification-channels';
import { TEMPLATES } from './templates';
import { renderTemplate } from 'src/shared/template-helper';
import { NotificationTemplate } from './notification-template.interface';

@Injectable()
export class NotificationTemplateService {
  getTemplate(
    type: NotificationType,
    channel: NotificationChannel,
    data: Record<string, string | number>,
  ) {
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
