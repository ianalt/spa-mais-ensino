import { AxiosResponse } from 'axios';
import { CreateKnowledgeAreaBody } from '../../features/manage/tables/knowledge-areas-table/dialogs/create-knowledge-area/types/create-knowledge-area-body';
import { instance } from '../instance';

export const addNewKnowledgeArea = async (
  body: CreateKnowledgeAreaBody
): Promise<AxiosResponse> => {
  const res = await instance.post(`/knowledge-areas`, body);

  return res;
};
