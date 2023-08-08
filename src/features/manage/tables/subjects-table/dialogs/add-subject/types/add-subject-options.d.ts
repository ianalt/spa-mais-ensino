import { KnowledgeAreaOption } from '../../../types/knowledge-area-option';
import { MonitorOption } from '../../../types/monitor-option';
import { TeacherOption } from '../../../types/teacher-option';

export interface AddSubjectOptions {
  knowledgeAreasList: KnowledgeAreaOption[];
  teachersList: TeacherOption[];
  monitorsList: MonitorOption[];
}
