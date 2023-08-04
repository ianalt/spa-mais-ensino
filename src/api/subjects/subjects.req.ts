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
