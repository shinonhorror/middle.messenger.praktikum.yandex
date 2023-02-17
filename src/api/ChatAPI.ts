import {
  ChatType, CreateChat, DeleteChat, UserToChat,
} from '~src/types/ChatTypes';
import HTTPTransport from './HTTPTransport';

const host = 'https://ya-praktikum.tech';
const chatAPIInstance = new HTTPTransport(`${host}/api/v2/chats`);

export default class ChatAPI {
  request(path: string): Promise<Array<ChatType>> {
    return chatAPIInstance
      .get(path, {
        method: 'GET',
      })
      .then((data) => data.response);
  }

  create(body: CreateChat): Promise<XMLHttpRequest> {
    return chatAPIInstance.post('', {
      method: 'POST',
      data: body,
    });
  }

  delete(body: DeleteChat, path: string = ''): Promise<XMLHttpRequest> {
    return chatAPIInstance.delete(path, {
      method: 'DELETE',
      data: body,
    });
  }

  token(id: number): Promise<any> {
    return chatAPIInstance
      .post(`/token/${id}`, {
        method: 'POST',
      })
      .then((data) => data.response);
  }

  update(body: UserToChat, path: string): Promise<XMLHttpRequest> {
    return chatAPIInstance.put(path, {
      method: 'PUT',
      data: body,
    });
  }

  updateAvatar(body: FormData): Promise<ChatType> {
    return chatAPIInstance
      .put('/avatar', {
        method: 'PUT',
        data: body,
      })
      .then((data) => data.response);
  }
}
