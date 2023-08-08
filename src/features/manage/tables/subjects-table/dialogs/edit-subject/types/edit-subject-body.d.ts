export interface EditSubjectBody {
  subjectId: number;

  name: string;

  description?: string;

  knowledgeAreaId: number;

  teacherId: number;

  monitorsIds: number[];
}
