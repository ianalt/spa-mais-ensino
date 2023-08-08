import { Role } from '../../../../../../../utils/enums/role.enum';
import { BasicUserInfo } from './basic-user-info';

export interface TeacherOption extends BasicUserInfo {
  role: Role.PROFESSOR;
}
