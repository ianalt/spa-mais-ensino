import { Role } from '../../../../../../../utils/enums/role.enum';

export interface MonitorOption {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Role.MONITOR;
}
