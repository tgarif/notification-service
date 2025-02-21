import { Test, TestingModule } from '@nestjs/testing';
import { MockCompanyService } from './mock-company.service';

describe('MockCompanyService', () => {
  let service: MockCompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MockCompanyService],
    }).compile();

    service = module.get<MockCompanyService>(MockCompanyService);
  });

  it('should return randomized company data', async () => {
    const company = await service.getCompanyData('company1');

    expect(company).toHaveProperty('companyId', 'company1');
    expect(company).toHaveProperty('companyName');
    expect(company).toHaveProperty('settings');
  });

  it('should return settings for a company', async () => {
    const company = await service.getCompanyData('company1');
    expect(company.settings).toBeDefined();
  });
});
