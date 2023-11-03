export interface BasicCategoryInfo {
  id: number;
  name: string;
}

export interface SubjectWithCategories {
  id: number;
  name: string;
  categories: BasicCategoryInfo[];
}

export interface ClassOptions {
  subjects: SubjectWithCategories[];
}
