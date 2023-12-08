import { AxiosResponse } from 'axios';
import { instance } from '../instance';
import { CreateStudentBody } from '../../features/manage/tables/users-table/dialogs/create-user/types/create-student-body';
import { CreateTeacherBody } from '../../features/manage/tables/users-table/dialogs/create-user/types/create-teacher-body';
import { CreateAdminBody } from '../../features/manage/tables/users-table/dialogs/create-user/types/create-admin-body';

export const addNewStudent = async (
  body: CreateStudentBody
): Promise<AxiosResponse> => {
  const res = await instance.post(`/users/student`, body);

  return res;
};

export const addNewTeacher = async (
  body: CreateTeacherBody
): Promise<AxiosResponse> => {
  const res = await instance.post(`/users/teacher`, body);

  return res;
};

export const addNewAdmin = async (
  body: CreateAdminBody
): Promise<AxiosResponse> => {
  const res = await instance.post(`/users/admin`, body);

  return res;
};
