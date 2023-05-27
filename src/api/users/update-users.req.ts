import { AxiosResponse } from 'axios';
import { UpdateAdminBody } from '../../features/manage/tables/users-table/dialogs/edit-user/types/update-admin-body';
import { UpdateMonitorBody } from '../../features/manage/tables/users-table/dialogs/edit-user/types/update-monitor-body';
import { UpdateStudentBody } from '../../features/manage/tables/users-table/dialogs/edit-user/types/update-student-body';
import { UpdateTeacherBody } from '../../features/manage/tables/users-table/dialogs/edit-user/types/update-teacher-body';
import { instance } from '../instance';

export const updateStudent = async (
  body: UpdateStudentBody
): Promise<AxiosResponse> => {
  const { userId, ...data } = body;
  const res = await instance.patch(`/users/student/${userId}`, data);

  return res;
};

export const updateMonitor = async (
  body: UpdateMonitorBody
): Promise<AxiosResponse> => {
  const { userId, ...data } = body;
  const res = await instance.patch(`/users/monitor/${userId}`, data);

  return res;
};

export const updateTeacher = async (
  body: UpdateTeacherBody
): Promise<AxiosResponse> => {
  const { userId, ...data } = body;
  const res = await instance.patch(`/users/teacher/${userId}`, data);

  return res;
};

export const updateAdmin = async (
  body: UpdateAdminBody
): Promise<AxiosResponse> => {
  const { userId, ...data } = body;
  const res = await instance.patch(`/users/admin/${userId}`, data);

  return res;
};
