import { SubjectOption } from './subject-option';

export interface Category {
  id: number;
  active: boolean;
  name: string;
  subject: SubjectOption;
  //TODO include topics
}
