import { AxiosResponse } from 'axios';
import { AddSubjectBody } from '../../features/manage/tables/subjects-table/dialogs/add-subject/types/add-subject-body';
import { instance } from '../instance';

export const createSubject = async (
  body: AddSubjectBody
): Promise<AxiosResponse> => {
  const res = await instance.post(`/subjects`, body);

  return res;
};
