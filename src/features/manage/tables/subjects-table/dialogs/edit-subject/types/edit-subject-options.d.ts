import { KnowledgeAreaOption } from '../../add-subject/types/knowledge-area-option';
import { TeacherOption } from '../../add-subject/types/teacher-option';

export interface EditSubjectOptions {
  knowledgeAreasList: KnowledgeAreaOption[];
  teachersList: TeacherOption[];
}
