import { AxiosResponse } from 'axios';
import { instance } from '../instance';

export const fetchSubjects = async (): Promise<AxiosResponse> => {
  const req = await instance.get(`/subjects`);

  return req;
};
