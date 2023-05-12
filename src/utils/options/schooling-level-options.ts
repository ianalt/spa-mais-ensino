import { SchoolingLevel } from '../enums/schooling-level.enum';
import { SchoolingLevelOption } from './types/schooling-level-option';

export const schoolingLevelOptions: SchoolingLevelOption[] = [
  { label: 'Ensino Técnico Incompleto', value: SchoolingLevel.ETI },
  { label: 'Ensino Técnico Completo', value: SchoolingLevel.ETC },
  { label: 'Ensino Médio Incompleto', value: SchoolingLevel.EMI },
  { label: 'Ensino Médio Completo', value: SchoolingLevel.EMC },
  { label: 'Supletivo', value: SchoolingLevel.S },
];

//TODO var for monitors and teachers
export const schoolingLevelOptionsForNonStudents: SchoolingLevelOption[] = [
  { label: 'Ensino Superior Incompleto', value: SchoolingLevel.ESI },
  { label: 'Ensino Superior Completo', value: SchoolingLevel.ESC },
  { label: 'Mestrado Incompleto', value: SchoolingLevel.MI },
  { label: 'Mestrado Completo', value: SchoolingLevel.MC },
  { label: 'Doutorado Incompleto', value: SchoolingLevel.DI },
  { label: 'Doutorado Completo', value: SchoolingLevel.DC },
  { label: 'Pós-Doutorado Incompleto', value: SchoolingLevel.PDI },
  { label: 'Pós-Doutorado Completo', value: SchoolingLevel.PDC },
];
