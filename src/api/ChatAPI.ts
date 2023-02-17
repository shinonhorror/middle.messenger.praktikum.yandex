import { CreateChat, DeleteChat, UserToChat } from '~src/types/ChatTypes';
import HTTPTransport from './HTTPTransport';

const host = 'https://ya-praktikum.tech';
const chatAPIInstance = new HTTPTransport(`${host}/api/v2/chats`);

export default class ChatAPI {
  request(path:string) {
    return chatAPIInstance
      .get(path, {
        method: 'GET',
      })
      .then((data) => data.response);
  }

  create(body: CreateChat) {
    return chatAPIInstance.post('', {
      method: 'POST',
      data: body,
    });
  }

  delete(body: DeleteChat, path:string = '') {
    return chatAPIInstance.delete(path, {
      method: 'DELETE',
      data: body,
    });
  }

  token(id: number) {
    return chatAPIInstance
      .post(`/token/${id}`, {
        method: 'POST',
      })
      .then((data) => data.response);
  }

  update(body: UserToChat) {
    return chatAPIInstance.put('/users', {
      method: 'PUT',
      data: body,
    });
  }
}
