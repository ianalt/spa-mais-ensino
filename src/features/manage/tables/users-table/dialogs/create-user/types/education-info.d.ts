import { SchoolingLevelOption } from '../../../../../../../utils/options/types/schooling-level-option';

export interface EducationInfo {
  courseName?: string;
  institutionName: string;
  schoolingLevel: SchoolingLevelOption | null;
  startYear: string;
  conclusionYear?: string;
}
