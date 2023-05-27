import { SchoolingLevel } from '../../../../../../../utils/enums/schooling-level.enum';

export interface UpdateEducationInfo {
  id?: number;
  schoolingLevel: SchoolingLevel;
  courseName: string | null;
  institutionName: string;
  startYear: string;
  conclusionYear: string | null;
}
