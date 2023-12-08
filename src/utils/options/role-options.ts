import { Role } from '../enums/role.enum';
import { RoleOption } from './types/role-option';

export const roleOptions: RoleOption[] = [
  {
    label: 'Estudante',
    value: Role.ESTUDANTE,
  },
  {
    label: 'Professor(a)',
    value: Role.PROFESSOR,
  },
  {
    label: 'Administrador(a)',
    value: Role.ADMIN,
  },
];
