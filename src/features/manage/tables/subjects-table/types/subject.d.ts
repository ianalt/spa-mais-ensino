import { Role } from '../../../../../utils/enums/role.enum';

interface BasicUserInfo {
  id: number;
  role: Role;
  email: string;
  firstName: string;
  lastName: string;
}

interface BasicKnowledgeAreaInfo {
  id: number;
  name: string;
}

interface BasicCategoryInfo {
  id: number;
  name: string;
}

export interface Subject {
  id: number;
  active: boolean;
  name: string;
  description: string;
  users: BasicUserInfo[];
  knowledgeArea: BasicKnowledgeAreaInfo;
  categories: BasicCategoryInfo[];
}
