import { AxiosResponse } from 'axios';
import { instance } from '../instance';
import { EditProfileBody } from '../../features/profile/types/edit-profile.body';
import { ChangePasswordBody } from '../../features/profile/types/change-password.body';

export const fetchProfile = async (): Promise<AxiosResponse> => {
  const res = await instance.get(`/users/profile`);

  return res;
};

export const updateProfile = async (
  data: EditProfileBody
): Promise<AxiosResponse> => {
  const res = await instance.patch(`/users/profile`, data);

  return res;
};

export const changePassword = async (
  data: ChangePasswordBody
): Promise<AxiosResponse> => {
  const res = await instance.patch(`/users/profile/change-password`, data);

  return res;
};
