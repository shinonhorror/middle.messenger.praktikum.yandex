import ChatAPI from '~src/api/ChatAPI';
import { store } from '~src/services/Store';
import formatData from '~src/utils/data';
import {
  ChatType, CreateChat, DeleteChat, UserToChat,
} from '~src/types/ChatTypes';
import defaultAvatar from '~src/img/avatar.png';

const chatApi = new ChatAPI();

class ChatControl {
  public async getChats() {
    try {
      const chat = await chatApi.request('');
      chat.forEach((item: ChatType) => {
        if (item.last_message) {
          item.last_message.time = formatData(item.last_message.time);
        }
        if (!item.avatar) {
          item.defaultAvatar = defaultAvatar;
        }
      });
      store.set('chat', chat);
    } catch (e: any) {
      console.error(e);
    }
  }

  public async createChat(title: CreateChat) {
    try {
      await chatApi.create(title);
      await this.getChats();
    } catch (e: any) {
      console.error(e);
    }
  }

  public async deleteChat(id: DeleteChat) {
    try {
      await chatApi.delete(id);
      await this.getChats();
      store.set('mess', undefined);
      const activeChat = store.getState().chat[0] as any;
      store.set('active', activeChat || undefined);
    } catch (e: any) {
      console.error(e);
      alert('У вас нет доступа к удалению чата');
    }
  }

  public async deleteUser(data: UserToChat) {
    try {
      await chatApi.delete(data, '/users');
      await this.getChats();
    } catch (e: any) {
      console.error(e);
    }
  }

  public async addUser(data: UserToChat) {
    try {
      await chatApi.update(data, '/users');
      await this.getChats();
    } catch (e: any) {
      console.error(e);
    }
  }

  public async getUsers(id: string) {
    const users = await chatApi.request(`/${id}/users`);
    return users;
  }

  public async updateChatAvatar(data: FormData) {
    try {
      const active = await chatApi.updateAvatar(data);
      this.setActiveChat(active);
      await this.getChats();
    } catch (e: any) {
      console.error(e);
    }
  }

  public async getToken(id: number) {
    return chatApi.token(id);
  }

  public setActiveChat(data: ChatType) {
    store.set('active', data);
  }
}

export default new ChatControl();
