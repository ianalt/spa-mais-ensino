import { Role } from '../../../../../utils/enums/role.enum';
import { KnowledgeAreaOption } from './knowledge-area-option';

interface BasicUserInfo {
  id: number;
  role: Role;
  email: string;
  firstName: string;
  lastName: string;
}

export interface BasicCategoryInfo {
  id: number;
  name: string;
}

export interface Subject {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  name: string;
  description: string;
  users: BasicUserInfo[];
  knowledgeArea: KnowledgeAreaOption;
  categories: BasicCategoryInfo[];
}
