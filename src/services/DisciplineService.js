import { httpClient } from "./httpClient";

export class DisciplineService {
  static async getDisciplineById(disciplineId) {
    const response = await httpClient.get(`/disciplina/${disciplineId}`);

    return response;
  }

  static async updateDiscipline(disciplineId, payload) {
    const response = await httpClient.put(`/disciplina/${disciplineId}`, payload);

    return response;
  }
}