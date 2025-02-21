import { Test, TestingModule } from '@nestjs/testing';
import { MockUserService } from './mock-user.service';

describe('MockUserService', () => {
  let service: MockUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MockUserService],
    }).compile();

    service = module.get<MockUserService>(MockUserService);
  });

  it('should return randomized user data', async () => {
    const user = await service.getUserData('userId1');

    expect(user).toHaveProperty('userId', 'userId1');
    expect(user).toHaveProperty('firstName');
    expect(user).toHaveProperty('lastName');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('phone');
    expect(user).toHaveProperty('leaveBalance');
    expect(user).toHaveProperty('payslip');
    expect(user).toHaveProperty('settings');
  });

  it('should return randomized leave balance for a user', async () => {
    const user = await service.getUserData('userId1');
    expect(user.leaveBalance).toHaveProperty('leaveDays');
    expect(typeof user.leaveBalance.leaveDays).toBe('number');
  });

  it('should return randomized payslip data for a user', async () => {
    const user = await service.getUserData('userId1');
    expect(user.payslip).toHaveProperty('month');
    expect(typeof user.payslip.month).toBe('string');
  });

  it('should return settings for a user', async () => {
    const user = await service.getUserData('userId1');
    expect(user.settings).toBeDefined();
  });
});
