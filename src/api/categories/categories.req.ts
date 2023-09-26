import { AxiosResponse } from 'axios';
import { instance } from '../instance';

export const fetchCategories = async (): Promise<AxiosResponse> => {
  const req = await instance.get(`/categories`);

  return req;
};

export const fetchCategoryOptions = async (): Promise<AxiosResponse> => {
  const res = await instance.get('/categories/options');

  return res;
};

export const fetchCategory = async (id: number): Promise<AxiosResponse> => {
  const req = await instance.get(`/categories/${id}`);

  return req;
};
