import { Test, TestingModule } from '@nestjs/testing';
import { NotificationTemplateService } from './notification-template.service';
import { NotificationChannel, NotificationType } from 'src/shared/enums/notification.enums';
import { TemplateData } from 'src/shared/types/notification.types';

describe('NotificationTemplateService', () => {
  let service: NotificationTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationTemplateService],
    }).compile();

    service = module.get<NotificationTemplateService>(NotificationTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw error when using email template for Leave Balance Reminder', () => {
    const notificationType = NotificationType.LEAVE_BALANCE_REMINDER;
    const notificationChannel = NotificationChannel.EMAIL;

    const templateData: TemplateData = {
      firstName: 'John',
      companyName: 'Test Corp',
      leaveDays: 10,
      month: 'February',
    };

    expect(() => service.getTemplate(notificationType, notificationChannel, templateData)).toThrow(
      `Template not found for type ${notificationType} and channel ${notificationChannel}`,
    );
  });

  it('should return the correct ui template for Leave Balance Reminder', () => {
    const templateData: TemplateData = {
      firstName: 'John',
      companyName: 'Test Corp',
      leaveDays: 8,
      month: 'February',
    };

    const template = service.getTemplate(
      NotificationType.LEAVE_BALANCE_REMINDER,
      NotificationChannel.UI,
      templateData,
    );

    expect(template.subject).toBeUndefined();
    expect(template.content).toBe(`Reminder: You have ${templateData.leaveDays} leave days left.`);
  });

  it('should return the correct email template for Monthly Payslip', () => {
    const templateData: TemplateData = {
      firstName: 'John',
      companyName: 'Test Corp',
      leaveDays: 8,
      month: 'February',
    };

    const template = service.getTemplate(
      NotificationType.MONTHLY_PAYSLIP,
      NotificationChannel.EMAIL,
      templateData,
    );

    expect(template.subject).toBe('Your Monthly Payslip is Ready');
    expect(template.content).toBe(
      `Hello ${templateData.firstName}, your payslip for ${templateData.month} is now available. Check your email for details.`,
    );
  });

  it('should throw error when using ui template for Monthly Payslip', () => {
    const notificationType = NotificationType.MONTHLY_PAYSLIP;
    const notificationChannel = NotificationChannel.UI;

    const templateData: TemplateData = {
      firstName: 'John',
      companyName: 'Test Corp',
      leaveDays: 8,
      month: 'February',
    };

    expect(() => service.getTemplate(notificationType, notificationChannel, templateData)).toThrow(
      `Template not found for type ${notificationType} and channel ${notificationChannel}`,
    );
  });

  it('should return the correct email template for Happy Birthday', () => {
    const templateData: TemplateData = {
      firstName: 'John',
      companyName: 'Test Corp',
      leaveDays: 8,
      month: 'February',
    };

    const template = service.getTemplate(
      NotificationType.HAPPY_BIRTHDAY,
      NotificationChannel.EMAIL,
      templateData,
    );

    expect(template.subject).toBe(`Happy Birthday ${templateData.firstName}!`);
    expect(template.content).toBe(`${templateData.companyName} is wishing you a happy birthday!`);
  });

  it('should return the correct ui template for Happy Birthday', () => {
    const templateData: TemplateData = {
      firstName: 'John',
      companyName: 'Test Corp',
      leaveDays: 8,
      month: 'February',
    };

    const template = service.getTemplate(
      NotificationType.HAPPY_BIRTHDAY,
      NotificationChannel.UI,
      templateData,
    );

    expect(template.subject).toBeUndefined();
    expect(template.content).toBe(`Happy Birthday ${templateData.firstName}`);
  });

  it('should throw an error for unsupported notification type', () => {
    const notificationType = 'invalid-type' as NotificationType;
    const notificationChannel = NotificationChannel.EMAIL;

    const templateData: TemplateData = {
      firstName: 'John',
      companyName: 'Test Corp',
      leaveDays: 8,
      month: 'February',
    };

    expect(() => service.getTemplate(notificationType, notificationChannel, templateData)).toThrow(
      `Template not found for type ${notificationType} and channel ${notificationChannel}`,
    );
  });

  it('should throw an error for unsupported notification channel', () => {
    const notificationType = NotificationType.LEAVE_BALANCE_REMINDER;
    const notificationChannel = 'invalid-type' as NotificationChannel;

    const templateData: TemplateData = {
      firstName: 'John',
      companyName: 'Test Corp',
      leaveDays: 8,
      month: 'February',
    };

    expect(() => service.getTemplate(notificationType, notificationChannel, templateData)).toThrow(
      `Template not found for type ${notificationType} and channel ${notificationChannel}`,
    );
  });
});
