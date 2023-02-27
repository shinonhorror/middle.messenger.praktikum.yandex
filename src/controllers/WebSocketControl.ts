import { store } from '@/services/Store';
import ChatControl from './ChatControl';
import { DataMessage } from '@/types/ChatTypes';

import { isArray } from '@/utils/helpers';
import { formatData, formatMonth } from '@/utils/dateFormatter';

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

  public loadMessage(offset: number = 0): void {
    this.socket?.send(
      JSON.stringify({
        content: `${offset}`,
        type: 'get old',
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
    this.socket.addEventListener('open', () => {
      console.log('Соединение установлено');
      this.update();
      store.set('mess', []);
      this.loadMessage();
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
        let loaded = 0;
        let maxId = 0;
        if (data.type === 'pong' || data.type === 'user connected') {
          return;
        }
        let temp = '';
        const newMessages: Array<unknown> = [];
        if (isArray(data)) {
          data.reverse().forEach((item: DataMessage) => {
            const day = formatMonth(item.time);
            if (item.user_id === userId) {
              newMessages.push({
                classItem: 'chat__window-your_message',
                classText: 'chat__window-your_text',
                classDate: 'chat__window-your_date',
                text: item.content,
                date: formatData(item.time),
                isRead: item.is_read,
                path: item.file ? item.file.path : null,
                time: day !== temp ? day : null,
              });
            } else {
              newMessages.push({
                classItem: 'chat__window-user_message',
                classText: 'chat__window-user_text',
                classDate: 'chat__window-user_date',
                text: item.content,
                date: formatData(item.time),
                isRead: item.is_read,
                path: item.file ? item.file.path : null,
                time: day !== temp ? day : null,
              });
            }
            if (maxId < item.id) {
              maxId = item.id;
            }
            loaded += 1;
            temp = day;
          });
          store.set('mess', [...newMessages, ...(mess || [])]);
          if (loaded === 20) {
            this.loadMessage(maxId);
          }
        } else {
          if (data.user_id === userId) {
            newMessages.push({
              classItem: 'chat__window-your_message',
              classText: 'chat__window-your_text',
              classDate: 'chat__window-your_date',
              text: data.content,
              date: formatData(data.time),
              isRead: data.is_read,
              path: data.file ? data.file.path : null,
            });
          } else {
            newMessages.push({
              classItem: 'chat__window-user_message',
              classText: 'chat__window-user_text',
              classDate: 'chat__window-user_date',
              text: data.content,
              date: formatData(data.time),
              isRead: data.is_read,
              path: data.file ? data.file.path : null,
            });
          }
          store.set('mess', [...(mess || []), ...newMessages]);
        }
      } catch (e: any) {
        console.error(e.message);
      }
    });
  }
}

export default new WebSocketControl();
