import { AxiosResponse } from 'axios';
import { instance } from '../instance';

export const deleteSubject = async (
  subjectId: number
): Promise<AxiosResponse> => {
  const res = await instance.delete(`/subjects/${subjectId}`);

  return res;
};
