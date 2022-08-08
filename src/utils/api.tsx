import axios from "axios";
// import { BaseUser } from '../types/base-user.type';

export const instance = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// export const fetchSignIn = async (
//   email: string | undefined,
//   password: string | undefined
// ) => {
//   const data = { email, password };
//   return await instance.post<BaseUser>("/auth/sign-in", data);
// };
