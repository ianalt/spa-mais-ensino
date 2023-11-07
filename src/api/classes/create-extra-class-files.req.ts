import { AxiosResponse } from 'axios';
import { CreateClassBody } from '../../features/manage/tables/classes-table/types/create-class-body';
import { instance } from '../instance';

export const createExtraClassFiles = async (
  extraFiles: FileList,
  classId: number
): Promise<AxiosResponse> => {
  const form: any = new FormData();

  form.append('extraFiles', extraFiles);

  const res = await instance.post(`/class-files/${classId}/extra-files`, form);

  return res;
};
