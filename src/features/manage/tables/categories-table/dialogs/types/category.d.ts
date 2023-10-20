import { SubjectOption } from './subject-option';

export interface BasicClassesInfo {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  title: string;
}

export interface Category {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  name: string;
  subject: SubjectOption;
  classes: BasicClassesInfo;
}
