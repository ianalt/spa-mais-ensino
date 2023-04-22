import { AxiosResponse } from 'axios';
import { instance } from '../instance';
import { SignUpBody } from '../../utils/options/types/sign-up-body';

export const registerNewUser = async (
  body: SignUpBody
): Promise<AxiosResponse> => {
  const res = await instance.post(`/auth/sign-up`, body);

  return res;
};
