import { AxiosResponse } from 'axios';
import { CreateClassBody } from '../../features/manage/tables/classes-table/types/create-class-body';
import { instance } from '../instance';

export const createClass = async (
  body: CreateClassBody
): Promise<AxiosResponse> => {
  const res = await instance.post(`/classes`, body);

  return res;
};
