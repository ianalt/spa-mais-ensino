export interface Classes {
  id: number;

  createdAt: Date;

  updatedAt: Date;

  active: boolean;

  title: string;

  questions: BasicQuestionInfo[];

  classFiles: BasicCLassFileInfo[];

  createdBy: BasicUserInfo;

  category?: BasicCategoryInfo;
}
