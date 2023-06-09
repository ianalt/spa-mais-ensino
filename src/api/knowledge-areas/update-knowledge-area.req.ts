import { AxiosResponse } from 'axios';
import { instance } from '../instance';
import { UpdateKnowledgeAreaBody } from '../../features/manage/tables/knowledge-areas-table/dialogs/edit-knowledge-area/types/update-knowledge-area-body';

export const updateKnowledgeArea = async (
  body: UpdateKnowledgeAreaBody
): Promise<AxiosResponse> => {
  const { knowledgeAreaId, ...data } = body;
  const res = await instance.patch(`/knowledge-areas/${knowledgeAreaId}`, data);

  return res;
};
