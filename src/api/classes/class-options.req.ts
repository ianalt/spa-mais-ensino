import { AxiosResponse } from 'axios';
import { instance } from '../instance';

export const fetchClassOptions = async (): Promise<AxiosResponse> => {
  const res = await instance.get(`/classes/options`);

  return res;
};
