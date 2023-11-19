import { AxiosResponse } from 'axios';
import { instance } from '../instance';

export const deleteClass = async (classId: number): Promise<AxiosResponse> => {
  const res = await instance.delete(`/classes/${classId}`);

  return res;
};
