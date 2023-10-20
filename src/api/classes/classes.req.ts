import { AxiosResponse } from 'axios';
import { instance } from '../instance';

export const fetchClasses = async (): Promise<AxiosResponse> => {
  const req = await instance.get(`/classes`);

  return req;
};
