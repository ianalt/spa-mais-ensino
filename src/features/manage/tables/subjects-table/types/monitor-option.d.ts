import { Role } from '../../../../../../../utils/enums/role.enum';
import { BasicUserInfo } from './basic-user-info';

export interface MonitorOption extends BasicUserInfo {
  role: Role.MONITOR;
}
