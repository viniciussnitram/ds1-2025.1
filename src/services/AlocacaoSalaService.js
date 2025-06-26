import { httpClient } from "./httpClient";

export class AlocacaoSalaService {
  static async createAlocacao(payload) {
    const response = httpClient.post('/alocacoes', payload);

    return response;
  }

  static async getAllAlocacoes() {
    const response = httpClient.get('/alocacoes');

    return response;
  }

  static async getAlocacaoById(id) {
    const response = httpClient.get(`/alocacoes/${id}`);

    return response;
  }

  static async editAlocacao(id, payload) {
    const response = httpClient.put(`/alocacoes/${id}`, payload);

    return response;
  }

  static async deleteAlocacao(id) {
    const response = httpClient.delete(`/alocacoes/${id}`);

    return response;
  }
}