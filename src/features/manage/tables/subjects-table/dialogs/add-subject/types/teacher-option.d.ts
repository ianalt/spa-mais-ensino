import { Role } from '../../../../../../../utils/enums/role.enum';

export interface TeacherOption {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Role.PROFESSOR;
}
