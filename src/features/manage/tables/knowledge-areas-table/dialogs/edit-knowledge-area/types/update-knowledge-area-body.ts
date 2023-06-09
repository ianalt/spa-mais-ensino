export interface UpdateKnowledgeAreaBody {
  knowledgeAreaId: number;
  name: string;
  description?: string;
  active: boolean;
}
