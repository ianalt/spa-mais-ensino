import { Ethnicity } from '../enums/ethnicity.enum';
import { EthnicityOption } from './types/ethnicity-option';

export const ethnicityOptions: EthnicityOption[] = [
  {
    label: 'Amarela',
    value: Ethnicity.AMARELA,
  },
  {
    label: 'Branca',
    value: Ethnicity.BRANCA,
  },
  {
    label: 'Indígena',
    value: Ethnicity.INDIGENA,
  },
  {
    label: 'Parda',
    value: Ethnicity.PARDA,
  },
  {
    label: 'Preta',
    value: Ethnicity.PRETA,
  },
];
