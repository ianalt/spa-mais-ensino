import { AxiosResponse } from 'axios';
import { CreateClassBody } from '../../features/manage/tables/classes-table/types/create-class-body';
import { instance } from '../instance';

export const createVideoClassFile = async (
  videoClassFile: File | null,
  classId: number
): Promise<AxiosResponse> => {
  const form: any = new FormData();

  form.append('videoClassFile', videoClassFile);

  const res = await instance.post(`/class-files/${classId}/video-class`, form);

  return res;
};
