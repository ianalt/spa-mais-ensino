import { AxiosResponse } from 'axios';
import { instance } from '../instance';

export const fetchClasses = async (): Promise<AxiosResponse> => {
  const res = await instance.get(`/classes`);

  return res;
};
