import { BasicUserInfo } from '../../subjects-table/types/basic-user-info';

interface ClassQuestion {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  title: string;
  content: string;
  //TODO answer
  answers: any[];
  //TODO user
  createdBy: BasicUserInfo;
}

interface QuestionCategory {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  name: string;
  subject: SubjectForCategory;
}

interface SubjectForCategory {
  id: number;
  name: string;
}

export interface Classes {
  id: number;

  createdAt: Date;

  updatedAt: Date;

  active: boolean;

  title: string;

  questions: ClassQuestion[];

  classFiles: any[];

  createdBy: BasicUserInfo;

  category: QuestionCategory;
}
