import { AxiosResponse } from 'axios';
import { instance } from '../instance';

export const fetchEthnicityStats = async (): Promise<AxiosResponse> => {
  const res = await instance.get(`/users/ethnicity-stats`);

  return res;
};

export const fetchGenderStats = async (): Promise<AxiosResponse> => {
  const res = await instance.get(`/users/gender-stats`);

  return res;
};

export const fetchUfStats = async (): Promise<AxiosResponse> => {
  const res = await instance.get(`/users/uf-stats`);

  return res;
};
