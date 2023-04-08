export interface Subject {
  id: number;
  active: boolean;
  name: string;
  description: string;
}

// @Expose()
// id: number;

// @Expose()
// active: boolean;

// @Expose()
// name: string;

// @Expose()
// description: string;

// @Expose()
// @ValidateNested({ each: true })
// @Type(() => BaseUserDto)
// users: BaseUserDto[];

// @Expose()
// @ValidateNested({ each: true })
// @Type(() => BaseKnowledgeAreaDto)
// knowledgeArea: BaseKnowledgeAreaDto;

// @Expose()
// @ValidateNested({ each: true })
// @Type(() => BaseCategoryDto)
// categories: BaseCategoryDto[];
