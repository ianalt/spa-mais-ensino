import { AxiosResponse } from "axios";
import { instance, instanceWelcome } from "../instance";

export const fetchKnowledgeAreasWelcome = async (): Promise<AxiosResponse> => {
  const req = await instanceWelcome.get(`/knowledge-areas/welcome`);

  return req;
};

export const fetchKnowledgeAreas = async (): Promise<AxiosResponse> => {
  const req = await instance.get(`/knowledge-areas`);

  return req;
};
