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

  static async editRoom(id, payload) {
    const response = await httpClient.put(`/sala/${id}`, payload);

    return response;
  }

  static async unavailableRoom(id, payload) {
    const response = await httpClient.post(`/sala/${id}/indisponibilidade`, payload);

    return response;
  }

  static async removeUnavailableRoom(idRoom, idUnavailable) {
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