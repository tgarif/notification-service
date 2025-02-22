import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { User } from 'src/shared/types/user.types';
import { NotificationChannel } from 'src/shared/enums/notification.enums';

@Injectable()
export class MockUserService {
  async getUserData(userId: string): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, faker.number.int({ min: 50, max: 200 })));
    return {
      userId,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      leaveBalance: {
        leaveDays: faker.number.int({ min: 5, max: 15 }),
        // NOTE: Add more mock data here...
      },
      payslip: {
        month: faker.date.month(),
        // NOTE: Add more mock data here...
      },
      settings: this.getUserSettings(userId),
    };
  }

  private getUserSettings(_: string): Record<NotificationChannel, boolean> {
    return {
      [NotificationChannel.EMAIL]: faker.datatype.boolean(),
      [NotificationChannel.UI]: faker.datatype.boolean(),
    };
  }
}
