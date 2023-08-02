import { KnowledgeAreaOption } from './knowledge-area-option';
import { MonitorOption } from './monitor-option';
import { TeacherOption } from './teacher-option';

export interface AddSubjectOptions {
  knowledgeAreasList: KnowledgeAreaOption[];
  teachersList: TeacherOption[];
  monitorsList: MonitorOption[];
}
