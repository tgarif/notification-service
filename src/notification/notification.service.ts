import { Injectable, Logger } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { NotificationChannel, NotificationType } from 'src/shared/enums/notification.enums';
import { NotificationMessage, TemplateData } from 'src/shared/types/notification.types';
import { NotificationChannelFactory } from 'src/notification-channel/notification-channel-factory';
import { NotificationTemplateService } from 'src/notification-template/notification-template.service';
import { MockUserService } from 'src/mock/mock-user.service';
import { MockCompanyService } from 'src/mock/mock-company.service';
import { SUPPORTED_CHANNELS } from 'src/definitions';
import { NotificationDocument } from './schemas/notification.schema';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly notificationChannelFactory: NotificationChannelFactory,
    private readonly notificationTemplateService: NotificationTemplateService,
    private readonly mockUserService: MockUserService,
    private readonly mockCompanyService: MockCompanyService,
  ) {}

  async sendNotification(companyId: string, userId: string, type: NotificationType) {
    const foundChannelMap = SUPPORTED_CHANNELS.find((channelMap) => channelMap.type === type);

    if (!foundChannelMap) {
      throw new Error(`Notification type ${type} is not supported`);
    }

    const companyData = await this.mockCompanyService.getCompanyData(companyId);
    const userData = await this.mockUserService.getUserData(userId);

    if (!companyData || !userData) {
      throw new Error('Company and User not found');
    }

    const templateData: TemplateData = {
      firstName: userData.firstName,
      companyName: companyData.companyName,
      leaveDays: userData.leaveBalance.leaveDays,
      month: userData.payslip.month,
    };

    const channels: NotificationChannel[] = foundChannelMap.channels;
    const sentNotifications: NotificationDocument[] = [];

    for (const channel of channels) {
      if (!this.isSubscribed(companyData, userData, channel)) {
        this.logger.log(
          `User ${userId} and Company ${companyId} are both unsubscribed from ${channel}. Skipping.`,
        );
        continue;
      }

      const templateMessage: NotificationMessage = this.notificationTemplateService.getTemplate(
        type,
        channel,
        templateData,
      );

      const channelStrategy = this.notificationChannelFactory.getStrategy(channel);

      const sentNotification = await channelStrategy.sendNotification(userId, templateMessage);

      const document = await this.notificationRepository.create({
        userId,
        companyId,
        type,
        channel,
        content: sentNotification.originalContent,
        subject: sentNotification.originalSubject,
        formattedMessage: sentNotification.formattedMessage,
      });

      sentNotifications.push(document);
    }

    return sentNotifications;
  }

  async getUserNotifications(userId: string, channel: NotificationChannel) {
    return this.notificationRepository.findByUserIdAndChannel(userId, channel);
  }

  // --- Private methods ---

  private isSubscribed(companyData: any, userData: any, channel: NotificationChannel): boolean {
    return userData.settings[channel] ?? companyData.settings[channel] ?? false;
  }
}
