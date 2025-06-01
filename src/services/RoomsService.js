import { httpClient } from "./httpClient";

export class RoomsService {
  static async createRoom(payload) {
    const response = await httpClient.post('/sala', payload);

    return response;
  }

  static async getAllRooms() {
    const response = await httpClient.get('/sala');

    return response;
  }

  static async getRoomById(id) {
    const response = await httpClient.get(`/sala/${id}`);

    return response;
  }

  static async updateRoom(id, payload) {
    const response = await httpClient.put(`/sala/${id}`, payload);

    return response;
  }

  static async postUnavailableRoom(id, payload) {
    const response = await httpClient.post(`/sala/${id}/indisponibilidade`, payload);

    return response;
  }

  static async deleteUnavailableRoom(idRoom, idUnavailable) {
    const response = await httpClient.delete(`/sala/${idRoom}/indisponibilidade/${idUnavailable}`);

    return response;
  }

  static async createFinalReportRoom(pdfDay) {
    const response = await httpClient.get(`/sala/relatorio/${pdfDay}`, {
      responseType: 'blob',
    });

    return response;
  }
}