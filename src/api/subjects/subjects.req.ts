import { AxiosResponse } from 'axios';
import { instance } from '../instance';

export const fetchSubjects = async (): Promise<AxiosResponse> => {
  const res = await instance.get('/subjects');

  return res;
};

export const fetchCreateSubjectOptions = async (): Promise<AxiosResponse> => {
  const res = await instance.get('/subjects/create-options');

  return res;
};

export const fetchUpdateSubjectOptions = async (
  subjectId: number
): Promise<AxiosResponse> => {
  const res = await instance.get(`/subjects/update-options/${subjectId}`);

  return res;
};
