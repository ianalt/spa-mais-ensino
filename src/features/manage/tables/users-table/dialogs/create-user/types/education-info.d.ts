import { SchoolingLevel } from '../../../../../../../utils/enums/schooling-level.enum';

export interface EducationInfo {
  courseName?: string;
  institutionName: string;
  schoolingLevel: SchoolingLevel | null;
  startYear: string;
  conclusionYear?: string | null;
}
