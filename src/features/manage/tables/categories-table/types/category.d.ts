import { SubjectOption } from './subject-option';

export interface Category {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  name: string;
  subject: SubjectOption;
  //TODO include topics
}
