import { AxiosResponse } from 'axios';
import { instance } from '../instance';

export const removeKnowledgeArea = async (
  knowledgeAreaId: number
): Promise<AxiosResponse> => {
  const res = await instance.delete(`/knowledge-areas/${knowledgeAreaId}`);

  return res;
};
