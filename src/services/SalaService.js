import { httpClient } from "./httpClient";

export class SalaService {
  static async createSala(payload) {
    const response = httpClient.post('/sala', payload);

    return response;
  }

  static async createRelatorioFinal(pdfDay) {
    const response = await httpClient.get(`/sala/relatorio/${pdfDay}`, {
      responseType: 'blob',
    });

    return response;
  }

  static async createIndisponibilidadeSala(id, payload) {
    const response = httpClient.post(`/sala/${id}/indisponibilidade`, payload);

    return response;
  }

  static async getAllSalas() {
    const response = httpClient.get('/sala');

    return response;
  }

  static async getSalaById(id) {
    const response = httpClient.get(`/sala/${id}`);

    return response;
  }

  static async getAllSalasDisponiveis() {
    const response = httpClient.get('/salao/obter-salas-disponiveis');

    return response;
  }

  static async editSala(id, payload) {
    const response = httpClient.put(`/sala/${id}`, payload);

    return response;
  }

  static async deleteSala(id) {
    const response = httpClient.delete(`/sala/${id}`);

    return response;
  }

  static async deleteIndisponibilidadeSala(id, indisponibilidadeId) {
    const response = httpClient.delete(`/sala/${id}/indisponibilidade/${indisponibilidadeId}`);

    return response;
  }
}