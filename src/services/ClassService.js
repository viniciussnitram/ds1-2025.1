import { httpClient } from "./httpClient";

export class ClassService {
  static async allocateClassAutomatically() {
    const response = await httpClient.post('/turma/alocar-turmas-automaticamente');

    return response;
  }

  static async allocateClass(payload) {
    const response = await httpClient.post('/turma/alocar-turma', payload);

    return response;
  }

  static async getAllClasses() {
    const response = await httpClient.get('/turma');

    return response;
  }

  static async getClassById(classId) {
    const response = await httpClient.get(`/turma/${classId}`);

    return response;
  }

  static async deallocateClass(classId) {
    const response = await httpClient.delete(`/turma/deletar-alocacao/${classId}`);

    return response;
  }

  static async createReportClass(formData) {
    const response = await httpClient.post('/turma/importar-excel-turmas', formData);

    return response;
  }

  static async clearSemester() {
    const response = await httpClient.post('/turma/limpar-semestre');

    return response;
  }

  static async getAllAvailableRooms(classId, dayWeek, classTime) {
    const response = await httpClient.get('/turma/obter-salas-disponiveis', {
      params: {
        classId,
        dayWeek,
        classTime
      },
    });

    return response;
  }
}