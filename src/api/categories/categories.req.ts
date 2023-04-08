import { AxiosResponse } from 'axios';
import { instance } from '../instance';

export const fetchCategories = async (): Promise<AxiosResponse> => {
  const req = await instance.get(`/categories`);

  return req;
};
