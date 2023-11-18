import { AxiosResponse } from 'axios';
import { EditClassTitleBody } from '../../features/access-class/types/edit-class-title-body';
import { instance } from '../instance';
import { EditClassCategoryBody } from '../../features/access-class/types/edit-class-category-body';
import { EditClassVideoBody } from '../../features/access-class/types/edit-class-video-body';
import { EditClassExtraFilesBody } from '../../features/access-class/types/edit-class-extra-files-body';

export const updateClassTitle = async (
  body: EditClassTitleBody
): Promise<AxiosResponse> => {
  const { classId, ...data } = body;
  const res = await instance.patch(`/classes/${classId}/title`, data);

  return res;
};

export const updateClassCategory = async (
  body: EditClassCategoryBody
): Promise<AxiosResponse> => {
  const { classId, ...data } = body;
  const res = await instance.patch(`/classes/${classId}/category`, data);

  return res;
};

export const updateClassVideo = async (
  body: EditClassVideoBody
): Promise<AxiosResponse> => {
  const { classId } = body;

  const form: any = new FormData();

  form.append('videoClassFile', body.videoClassFile);

  const res = await instance.patch(`/classes/${classId}/video-class`, form);

  return res;
};

export const updateClassExtraFiles = async (
  body: EditClassExtraFilesBody
): Promise<AxiosResponse> => {
  const { classId } = body;

  const form: any = new FormData();

  for (let i = 0; i < body.extraFiles.length; ++i) {
    form.append('extraFiles', body.extraFiles[i]);
  }

  const res = await instance.post(`/class-files/${classId}/extra-files`, form);

  return res;
};
