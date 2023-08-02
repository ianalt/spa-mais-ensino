export interface AddSubjectBody {
  name: string;

  description?: string;

  knowledgeAreaId: number;

  teacherId: number;

  monitorsIds: number[];
}
