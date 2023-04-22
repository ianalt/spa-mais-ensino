import { Gender } from '../enums/gender.enum';
import { GenderOption } from './types/gender-option';

export const genderOptions: GenderOption[] = [
  {
    label: 'Homem cisgênero',
    value: Gender.HOMEM_CIS,
  },
  {
    label: 'Homem transgênero',
    value: Gender.HOMEM_TRANS,
  },
  {
    label: 'Mulher cisgênero',
    value: Gender.MULHER_CIS,
  },
  {
    label: 'Mulher transgênero',
    value: Gender.MULHER_TRANS,
  },
  {
    label: 'Não-binário',
    value: Gender.NAO_BINARIO,
  },
  {
    label: 'Outro',
    value: Gender.OUTRO,
  },
];
