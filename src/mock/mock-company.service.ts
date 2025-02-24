import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Company } from 'src/shared/types/company.types';
import { NotificationChannel } from 'src/shared/enums/notification.enums';

@Injectable()
export class MockCompanyService {
  async getCompanyData(companyId: string): Promise<Company> {
    await new Promise((resolve) => setTimeout(resolve, faker.number.int({ min: 50, max: 200 })));
    return {
      companyId,
      companyName: faker.company.name(),
      settings: this.getCompanySettings(companyId),
    };
  }

  private getCompanySettings(_: string): Record<NotificationChannel, boolean> {
    return {
      [NotificationChannel.EMAIL]: faker.datatype.boolean(),
      [NotificationChannel.UI]: faker.datatype.boolean(),
    };
  }
}
