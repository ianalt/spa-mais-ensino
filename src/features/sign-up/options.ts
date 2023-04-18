import { EthnicityOption } from './types/ethnicity-option';
import { GenderOption } from './types/gender-option';
import { SchoolingLevelOption } from './types/schooling-level-option';
import { UfOption } from './types/uf-option';

export const ufOptions: UfOption[] = [
  { label: 'AC', value: 'AC' },
  { label: 'AL', value: 'AL' },
  { label: 'AP', value: 'AP' },
  { label: 'AM', value: 'AM' },
  { label: 'BA', value: 'BA' },
  { label: 'CE', value: 'CE' },
  { label: 'DF', value: 'DF' },
  { label: 'ES', value: 'ES' },
  { label: 'GO', value: 'GO' },
  { label: 'MA', value: 'MA' },
  { label: 'MT', value: 'MT' },
  { label: 'MS', value: 'MS' },
  { label: 'MG', value: 'MG' },
  { label: 'PA', value: 'PA' },
  { label: 'PB', value: 'PB' },
  { label: 'PR', value: 'PR' },
  { label: 'PE', value: 'PE' },
  { label: 'PI', value: 'PI' },
  { label: 'RJ', value: 'RJ' },
  { label: 'RN', value: 'RN' },
  { label: 'RS', value: 'RS' },
  { label: 'RO', value: 'RO' },
  { label: 'RR', value: 'RR' },
  { label: 'SC', value: 'SC' },
  { label: 'SP', value: 'SP' },
  { label: 'SE', value: 'SE' },
  { label: 'TO', value: 'TO' },
];

export const schoolingLevelOptions: SchoolingLevelOption[] = [
  { label: 'Ensino Técnico Incompleto', value: 'Ensino Técnico Incompleto' },
  { label: 'Ensino Técnico Completo', value: 'Ensino Técnico Completo' },
  { label: 'Ensino Médio Incompleto', value: 'Ensino Médio Incompleto' },
  { label: 'Ensino Médio Completo', value: 'Ensino Médio Completo' },
  { label: 'Supletivo', value: 'Supletivo' },
];

export const genderOptions: GenderOption[] = [
  {
    label: 'Homem cisgênero',
    value: 'Homem cisgênero',
  },
  {
    label: 'Homem transgênero',
    value: 'Homem transgênero',
  },
  {
    label: 'Mulher cisgênero',
    value: 'Mulher cisgênero',
  },
  {
    label: 'Mulher transgênero',
    value: 'Mulher transgênero',
  },
  {
    label: 'Não-binário',
    value: 'Não-binário',
  },
  {
    label: 'Outro',
    value: 'Outro',
  },
];

export const ethnicityOptions: EthnicityOption[] = [
  {
    label: 'Amarela',
    value: 'Amarela',
  },
  {
    label: 'Branca',
    value: 'Branca',
  },
  {
    label: 'Indígena',
    value: 'Indígena',
  },
  {
    label: 'Parda',
    value: 'Parda',
  },
  {
    label: 'Preta',
    value: 'Preta',
  },
];
