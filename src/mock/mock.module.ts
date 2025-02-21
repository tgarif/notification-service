import { Module } from '@nestjs/common';
import { MockCompanyService } from './mock-company.service';
import { MockUserService } from './mock-user.service';

@Module({
  providers: [MockCompanyService, MockUserService],
  exports: [MockCompanyService, MockUserService],
})
export class MockModule {}
