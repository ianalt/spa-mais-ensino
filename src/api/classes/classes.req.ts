import { AxiosResponse } from 'axios';
import { instance } from '../instance';

export const fetchClasses = async (): Promise<AxiosResponse> => {
  const res = await instance.get(`/classes`);

  return res;
};

export const fetchRecentClasses = async (): Promise<AxiosResponse> => {
  const res = await instance.get(`/classes/recent`);

  return res;
};

export const fetchClass = async (classId: number): Promise<AxiosResponse> => {
  const res = await instance.get(`/classes/${classId}`);

  return res;
};

export const fetchClassesFromSubject = async (
  subjectId: number
): Promise<AxiosResponse> => {
  const res = await instance.get(`/classes?subjectId=${subjectId}`);

  return res;
};
