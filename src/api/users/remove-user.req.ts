import { AxiosResponse } from 'axios';
import { instance } from '../instance';

export const removeUser = async (userId: number): Promise<AxiosResponse> => {
  const res = await instance.delete(`/users/${userId}`);

  return res;
};
