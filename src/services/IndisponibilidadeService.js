import { httpClient } from "./httpClient";

export class IndisponibilidadeService {
  static async createIndisponibilidade(payload) {
    const response = httpClient.post('/indisponibilidades', payload);

    return response;
  }

  static async getAllIndiponibilidades() {
    const response = httpClient.get('/indisponibilidades');

    return response;
  }

  static async getIndisponibilidadeById(id) {
    const response = httpClient.get(`/indisponibilidades/${id}`);

    return response;
  }

  static async editIndisponibilidade(id, payload) {
    const response = httpClient.put(`/indisponibilidades/${id}`, payload);

    return response;
  }

  static async deleteIndisponibilidade(id) {
    const response = httpClient.delete(`/indisponibilidades/${id}`);

    return response;
  }
}