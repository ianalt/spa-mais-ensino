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

interface BasicSubjectInfo {
  id: number;
  name: string;
}

interface KnowledgeAreaForSubject {
  id: number;
  name: string;
}

interface CategoryWithSubject {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  name: string;
  subject: BasicSubjectInfo;
}

interface BasicClassInfo {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  title: string;
  createdBy: BasicUserInfo;
  category?: CategoryWithSubject;
}

interface FullCategoryInfo {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  name: string;
  classes: BasicClassInfo[];
}

export interface FullSubjectInfo {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  name: string;
  description: string;
  users: BasicUserInfo[];
  knowledgeArea: KnowledgeAreaForSubject;
  categories: FullCategoryInfo[];
}
