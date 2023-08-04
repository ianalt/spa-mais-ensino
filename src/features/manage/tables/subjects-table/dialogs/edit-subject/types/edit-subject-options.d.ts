import { KnowledgeAreaOption } from '../../add-subject/types/knowledge-area-option';
import { MonitorOption } from '../../add-subject/types/monitor-option';
import { TeacherOption } from '../../add-subject/types/teacher-option';

export interface EditSubjectOptions {
  knowledgeAreasList: KnowledgeAreaOption[];
  teachersList: TeacherOption[];
  monitorsList: MonitorOption[];
}
