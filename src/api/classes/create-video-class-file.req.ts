import { AxiosResponse } from 'axios';
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
