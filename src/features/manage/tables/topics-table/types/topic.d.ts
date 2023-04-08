export interface Topic {
  id: number;
  active: boolean;
  title: string;
}

// @Expose()
// id: number;

// @Expose()
// active: boolean;

// @Expose()
// title: string;

// @Expose()
// content: string;

// @Expose()
// videoURL: string;

// @Expose()
// @ValidateNested({ each: true })
// @Type(() => BaseCategoryDto)
// category: BaseCategoryDto;

// @Expose()
// @ValidateNested({ each: true })
// @Type(() => TopicFileDto)
// topicFiles: TopicFileDto[];

// @Expose()
// @ValidateNested({ each: true })
// @Type(() => CommentDto)
// comments: CommentDto[];
