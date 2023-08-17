import { AxiosResponse } from 'axios';
import { instance } from '../instance';

export const deleteCategory = async (
  categoryId: number
): Promise<AxiosResponse> => {
  const res = await instance.delete(`/categories/${categoryId}`);

  return res;
};
