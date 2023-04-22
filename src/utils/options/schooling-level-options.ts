import { SchoolingLevel } from '../enums/schooling-level.enum';
import { SchoolingLevelOption } from './types/schooling-level-option';

export const schoolingLevelOptions: SchoolingLevelOption[] = [
  { label: 'Ensino Técnico Incompleto', value: SchoolingLevel.ETI },
  { label: 'Ensino Técnico Completo', value: SchoolingLevel.ETC },
  { label: 'Ensino Médio Incompleto', value: SchoolingLevel.EMI },
  { label: 'Ensino Médio Completo', value: SchoolingLevel.EMC },
  { label: 'Supletivo', value: SchoolingLevel.S },
];
