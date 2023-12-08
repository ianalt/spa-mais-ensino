import { KnowledgeAreaOption } from '../../../types/knowledge-area-option';
import { TeacherOption } from '../../../types/teacher-option';

export interface AddSubjectOptions {
  knowledgeAreasList: KnowledgeAreaOption[];
  teachersList: TeacherOption[];
}
