import { AxiosResponse } from 'axios';
import { EditSubjectBody } from '../../features/manage/tables/subjects-table/dialogs/edit-subject/types/edit-subject-body';
import { instance } from '../instance';

export const update = async (body: EditSubjectBody): Promise<AxiosResponse> => {
  const { subjectId, ...data } = body;
  const res = await instance.patch(`/subjects/${subjectId}`, data);

  return res;
};
