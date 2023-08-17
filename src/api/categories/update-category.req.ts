import { AxiosResponse } from 'axios';
import { instance } from '../instance';
import { EditCategoryBody } from '../../features/manage/tables/categories-table/dialogs/edit-category/types/edit-category-body';

export const updateCategory = async (
  body: EditCategoryBody
): Promise<AxiosResponse> => {
  const { categoryId, ...data } = body;
  const res = await instance.patch(`/categories/${categoryId}`, data);

  return res;
};
