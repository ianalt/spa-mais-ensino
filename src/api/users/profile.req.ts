import { AxiosResponse } from 'axios';
import { instance } from '../instance';

export const fetchProfile = async (): Promise<AxiosResponse> => {
  const res = await instance.get(`/users/profile`);

  return res;
};
