export interface EditSubjectBody {
  name: string;

  description?: string;

  knowledgeAreaId: number;

  teacherId: number;

  monitorsIds: number[];
}
