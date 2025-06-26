import { httpClient } from "./httpClient";

export class TurmaService {
  static async createTurma(payload) {
    const response = httpClient.post('/turma', payload);

    return response;
  }

  static async createAlocacaoTurma(payload) {
    const response = httpClient.post('/turma/alocar-turma', payload);

    return response;
  }

  static async getAllTurmas() {
    const response = httpClient.get('/turma');

    return response;
  }

  static async getTurmaById(id) {
    const response = httpClient.get(`/turma/${id}`);

    return response;
  }

  static async getDisciplinasTurma(id) {
    const response = httpClient.get(`/turma/disciplina/${id}`);

    return response;
  }

  static async editTurma(id, payload) {
    const response = httpClient.put(`/turma/${id}`, payload);

    return response;
  }

  static async deleteTurma(id) {
    const response = httpClient.delete(`/turma/${id}`);

    return response;
  }

  static async deleteAlocacaoTurma(id) {
    const response = httpClient.delete(`/turma/deletar-alocacao/${id}`);

    return response;
  }
}