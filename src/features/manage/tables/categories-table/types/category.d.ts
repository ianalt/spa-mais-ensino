export interface Category {
  id: number;
  active: boolean;
  name: string;
}

// @Expose()
// id: number;

// @Expose()
// name: string;

// @Expose()
// @ValidateNested({ each: true })
// @Type(() => BaseSubjectDto)
// subject: BaseSubjectDto;

// @Expose()
// @ValidateNested({ each: true })
// @Type(() => BaseTopicDto)
// topics: BaseTopicDto[];
