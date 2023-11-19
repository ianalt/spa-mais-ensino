import { AxiosResponse } from 'axios';
import { CreateClassBody } from '../../features/manage/tables/classes-table/types/create-class-body';
import { instance } from '../instance';

export const createExtraClassFiles = async (
  extraFiles: FileList,
  classId: number
): Promise<AxiosResponse> => {
  const form: any = new FormData();

  for (let i = 0; i < extraFiles.length; ++i) {
    form.append('extraFiles', extraFiles[i]);
  }

  const res = await instance.post(`/class-files/${classId}/extra-files`, form);

  return res;
};
