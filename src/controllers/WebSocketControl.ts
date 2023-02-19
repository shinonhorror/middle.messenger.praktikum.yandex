import { store } from '~src/services/Store';
import ChatControl from './ChatControl';
import isArray from '~src/utils/isArray';
import formatData from '~src/utils/data';
import { DataMessage } from '~src/types/ChatTypes';

class WebSocketControl {
  socket?: WebSocket;

  public update() {
    setInterval(() => {
      this.socket?.send(
        JSON.stringify({
          type: 'ping',
        }),
      );
    }, 30000);
  }

  public send(message: string) {
    this.socket?.send(
      JSON.stringify({
        content: message,
        type: 'message',
      }),
    );
  }

  public sendFile(message: string) {
    this.socket?.send(
      JSON.stringify({
        content: message,
        type: 'file',
      }),
    );
  }

  public disconnect() {
    this.socket?.close();
  }

  public async init(userId: string, chatID: string) {
    this.disconnect();
    const { token } = await ChatControl.getToken(Number(chatID));
    this.socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatID}/${token}`,
    );
    this.update();
    this.socket.addEventListener('open', () => {
      console.log('Соединение установлено');
      if (this.socket) {
        store.set('mess', []);
        this.socket.send(
          JSON.stringify({
            content: '0',
            type: 'get old',
          }),
        );
      }
    });
    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }
    });
    this.socket.addEventListener('error', (event) => {
      console.log('Ошибка', event);
    });
    this.socket.addEventListener('message', (event) => {
      try {
        const { mess } = store.getState();
        const data = JSON.parse(event.data);
        if (data.type === 'pong') {
          return;
        }
        const newMessages = [];
        if (isArray(data)) {
          data.forEach((item: DataMessage) => {
            if (item.user_id === userId) {
              newMessages.unshift({
                classItem: 'chat__window-your_message',
                classText: 'chat__window-your_text',
                classDate: 'chat__window-your_date',
                text: item.content,
                date: formatData(item.time),
                isRead: item.is_read,
              });
            } else {
              newMessages.unshift({
                classItem: 'chat__window-user_message',
                classText: 'chat__window-user_text',
                classDate: 'chat__window-user_date',
                text: item.content,
                date: formatData(item.time),
                isRead: item.is_read,
              });
            }
          });
        } else if (data.user_id === userId) {
          newMessages.push({
            classItem: 'chat__window-your_message',
            classText: 'chat__window-your_text',
            classDate: 'chat__window-your_date',
            text: data.content,
            date: formatData(data.time),
            isRead: data.is_read,
          });
        } else {
          newMessages.push({
            classItem: 'chat__window-user_message',
            classText: 'chat__window-user_text',
            classDate: 'chat__window-user_date',
            text: data.content,
            date: formatData(data.time),
            isRead: data.is_read,
          });
        }
        store.set('mess', [...(mess || []), ...newMessages]);
      } catch (e: any) {
        console.error(e.message);
      }
    });
  }
}

export default new WebSocketControl();
