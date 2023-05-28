import { AxiosResponse } from 'axios';
import { instance } from '../instance';

export const fetchEthnicityStats = async (): Promise<AxiosResponse> => {
  const res = await instance.get(`/users/ethnicity-stats`);

  return res;
};
