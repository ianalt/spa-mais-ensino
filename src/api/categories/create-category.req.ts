import { AxiosResponse } from 'axios';
import { instance } from '../instance';
import { AddCategoryBody } from '../../features/manage/tables/categories-table/dialogs/add-category/types/add-category-body';

export const createCategory = async (
  body: AddCategoryBody
): Promise<AxiosResponse> => {
  const res = await instance.post(`/categories`, body);

  return res;
};
