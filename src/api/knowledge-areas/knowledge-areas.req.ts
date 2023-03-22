import { AxiosResponse } from "axios";
import { instanceWelcome } from "../instance";

export const fetchKnowledgeAreasWelcome = async (): Promise<AxiosResponse> => {
  const req = await instanceWelcome.get(`/knowledge-areas/welcome`);

  return req;
};
