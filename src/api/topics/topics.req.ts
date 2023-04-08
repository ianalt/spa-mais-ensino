import { AxiosResponse } from 'axios';
import { instance } from '../instance';

export const fetchTopics = async (): Promise<AxiosResponse> => {
  const req = await instance.get(`/topics`);

  return req;
};
