import { AxiosResponse } from "axios";
import { instance } from "../instance";

export const login = async (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  const req = await instance.post(`/auth`, { email, password });

  return req;
};
