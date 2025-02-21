import { Injectable, Logger } from '@nestjs/common';
import { MockCompanyService } from 'src/mock/mock-company.service';
import { MockUserService } from 'src/mock/mock-user.service';
import { NotificationChannelFactory } from 'src/notification-channel/notification-channel-factory';
import { NotificationTemplateService } from 'src/notification-template/notification-template.service';
import { NotificationTypeFactory } from 'src/notification-type/notification-type-factory';
import { Company } from 'src/shared/model/company.model';
import { User } from 'src/shared/model/user.model';
import { NotificationChannel } from 'src/shared/notification-channels';
import { NotificationType } from 'src/shared/notification-types';

@Injectable()
export class NotificationDispatcherService {
  private readonly logger = new Logger(NotificationDispatcherService.name);

  constructor(
    private readonly notificationChannelFactory: NotificationChannelFactory,
    private readonly notificationTypeFactory: NotificationTypeFactory,
    private readonly notificationTemplateService: NotificationTemplateService,
    private readonly mockCompanyService: MockCompanyService,
    private readonly mockUserService: MockUserService,
  ) {}

  async sendNotification(companyId: string, userId: string, type: NotificationType) {
    const strategy = this.notificationTypeFactory.getStrategy(type);
    if (!strategy) {
      throw new Error(`No strategy found for notification type: ${type}`);
    }

    const companyData = await this.mockCompanyService.getCompanyData(companyId);
    const userData = await this.mockUserService.getUserData(userId);

    if (!companyData || !userData) {
      throw new Error('Company and User not found');
    }

    const templateData = {
      firstName: userData.firstName,
      companyName: companyData.companyName,
      leaveDays: userData.leaveBalance.leaveDays,
      month: userData.payslip.month,
    };

    const channels: NotificationChannel[] = strategy.getChannels();
    const sentNotifications: string[] = [];

    for (const channel of channels) {
      if (!this.isSubscribed(companyData, userData, channel)) {
        this.logger.log(
          `User ${userId} and Company ${companyId} are both unsubscribed from ${channel}. Skipping.`,
        );
        continue;
      }

      const formattedMessage = this.notificationTemplateService.getTemplate(
        type,
        channel,
        templateData,
      );
      const channelStrategy = this.notificationChannelFactory.getStrategy(channel);
      sentNotifications.push(channelStrategy.sendNotification(userId, formattedMessage));
    }

    return sentNotifications;
  }

  private isSubscribed(
    companyData: Company,
    userData: User,
    channel: NotificationChannel,
  ): boolean {
    const isCompanySubscribed = companyData.settings[channel] ?? false;
    const isUserSubscribed = userData.settings[channel] ?? false;

    return isCompanySubscribed || isUserSubscribed;
  }
}
