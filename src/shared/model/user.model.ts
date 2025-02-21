import { NotificationChannel } from '../notification-channels';

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  leaveBalance: {
    leaveDays: number;
  };
  payslip: {
    month: string;
  };
  settings: Record<NotificationChannel, boolean>;
}
