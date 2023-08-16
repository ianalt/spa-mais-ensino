export interface EditSubjectBody {
  subjectId: number;

  active: boolean;

  name: string;

  description?: string;

  knowledgeAreaId: number;

  teacherId: number;

  monitorsIds: number[];
}
