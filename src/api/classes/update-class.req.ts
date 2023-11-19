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
  const res = await instance.patch(`/classes/${classId}/class-title`, data);

  return res;
};

export const updateClassCategory = async (
  body: EditClassCategoryBody
): Promise<AxiosResponse> => {
  const { classId, ...data } = body;
  const res = await instance.patch(`/classes/${classId}/class-category`, data);

  return res;
};

export const updateClassVideo = async (
  body: EditClassVideoBody
): Promise<AxiosResponse> => {
  const { classId } = body;

  const form: any = new FormData();

  form.append('videoClassFile', body.videoClassFile);

  const res = await instance.patch(
    `/class-files/${classId}/video-class/update`,
    form
  );

  return res;
};

export const updateClassExtraFiles = async (
  classId: number,
  extraFiles: FileList
): Promise<AxiosResponse> => {
  const form: any = new FormData();

  for (let i = 0; i < extraFiles.length; ++i) {
    form.append('extraFiles', extraFiles[i]);
  }

  const res = await instance.patch(
    `/class-files/${classId}/extra-files/update`,
    form
  );

  return res;
};

export const removeClassExtraFiles = async (
  classId: number
): Promise<AxiosResponse> => {
  const res = await instance.delete(
    `/class-files/${classId}/extra-files/remove`
  );

  return res;
};
