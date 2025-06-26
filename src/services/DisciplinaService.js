import { httpClient } from "./httpClient";

export class DisciplinaService {
  static async createDisciplina(payload) {
    const response = httpClient.post('/disciplina', payload);

    return response;
  }

  static async getAllDisciplinas() {
    const response = httpClient.get('/disciplina');

    return response;
  }

  static async getDisciplinaById(id) {
    const response = httpClient.get(`/disciplina/${id}`);

    return response;
  }

  static async editDisciplina(id, payload) {
    const response = httpClient.put(`/disciplina/${id}`, payload);

    return response;
  }

  static async deleteDisciplina(id) {
    const response = httpClient.delete(`/disciplina/${id}`);

    return response;
  }
}