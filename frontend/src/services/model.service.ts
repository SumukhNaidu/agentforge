import { api } from "./api";

export interface Model {
  name: string;
  size: string;
  family: string;
  parameters: string;
  quantization: string;
  modified_at: string;
}

export interface CurrentModel {
  active_model: string;
}

class ModelService {
  async getModels(): Promise<Model[]> {
    const response = await api.get<Model[]>("/models");
    return response.data;
  }

  async getCurrentModel(): Promise<CurrentModel> {
    const response = await api.get<CurrentModel>("/models/current");
    return response.data;
  }

  async refreshModels(): Promise<Model[]> {
    const response = await api.get<Model[]>("/models");
    return response.data;
  }

  async changeModel(model: string): Promise<CurrentModel> {
  const response = await api.put<CurrentModel>(
    "/models/current",
    {
      active_model: model,
    }
  );

  return response.data;
}
}

export const modelService = new ModelService();