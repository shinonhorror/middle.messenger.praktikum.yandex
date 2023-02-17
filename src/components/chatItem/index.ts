import tpl from './chatItem';
import Component from '../../services/Component';
import { store } from '~src/services/Store';
import ChatControl from '~src/controllers/ChatControl';
import WebSocketControl from '~src/controllers/WebSocketControl';
import { ChatItemType, ChatType } from '~src/types/ChatTypes';
import connect from '~src/services/Connector';

export default class ChatItem extends Component<ChatItemType> {
  constructor(props?: ChatItemType) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(tpl, { ...this._props });
  }

  addEvents(): void {
    this._element
      .querySelectorAll('.chat__list-item')
      .forEach((item: HTMLElement) => {
        const menu = item.querySelector('.contextmenu') as HTMLElement;
        item.addEventListener('contextmenu', (e: MouseEvent): void => {
          e.preventDefault();
          menu.style.top = `${e.clientY}px`;
          menu.style.left = `${e.clientX}px`;
          menu.classList.toggle('active');
        });
        item.addEventListener('click', (e: Event) => {
          const element = e.currentTarget as HTMLElement;
          const chats = store.getState().chat as Array<ChatType>;
          const activeChat = chats.filter(
            (el: { [key: string]: any }) => el.id === Number(element.dataset.id),
          );
          const a = chats.find(
            (el: ChatType) => el.id === Number(element.dataset.id)
          );
          console.log(a)
          ChatControl.setActiveChat(activeChat);
          WebSocketControl.init(this._props.user.id, this._props.active[0].id);
        });
        menu.addEventListener('click', (e: Event): void => {
          e.stopPropagation();
        });
        const del = menu.querySelector('.item-delete') as HTMLElement;
        del.addEventListener('click', async () => {
          const action = confirm('Вы уверены, что хотите удалить чат?');
          if (action) {
            await ChatControl.deleteChat({
              chatId: item.dataset.id as string,
            });
          }
          menu.classList.remove('active');
        });
      });
    document.addEventListener(
      'click',
      (e) => {
        if (e.button !== 2) {
          this._element.querySelectorAll('.chat__list-item').forEach((item) => {
            const menu = item.querySelector('.contextmenu') as HTMLElement;
            menu.classList.remove('active');
          });
        }
      },
      false,
    );
    super.addEvents();
  }

  removeEvents(): void {
    this._element
      .querySelectorAll('.chat__list-item')
      .forEach((item: HTMLElement) => {
        const menu = item.querySelector('.contextmenu') as HTMLElement;
        item.removeEventListener('contextmenu', (e: MouseEvent): void => {
          e.preventDefault();
          menu.style.top = `${e.clientY}px`;
          menu.style.left = `${e.clientX}px`;
          menu.classList.toggle('active');
        });
        item.removeEventListener('click', async (e: Event) => {
          const element = e.currentTarget as HTMLElement;
          const chats = store.getState().chat as Array<ChatType>;
          const activeChat = chats.filter(
            (el: { [key: string]: any }) => el.id === Number(element.dataset.id),
          );
          ChatControl.setActiveChat(activeChat);
          await ChatControl.getChats();
          WebSocketControl.init(this._props.user.id, this._props.active[0].id);
        });
        menu.removeEventListener('click', (e: Event): void => {
          e.stopPropagation();
        });
        const del = menu.querySelector('.item-delete') as HTMLElement;
        del.removeEventListener('click', async () => {
          const action = confirm('Вы уверены, что хотите удалить чат?');
          if (action) {
            await ChatControl.deleteChat({
              chatId: item.dataset.id as string,
            });
          }
          menu.classList.remove('active');
        });
      });
    document.removeEventListener(
      'click',
      (e) => {
        if (e.button !== 2) {
          this._element.querySelectorAll('.chat__list-item').forEach((item) => {
            const menu = item.querySelector('.contextmenu') as HTMLElement;
            menu.classList.remove('active');
          });
        }
      },
      false,
    );
    super.removeEvents();
  }
}

export const withChats = connect((state) => ({ ...state }));

export const ChatItemClass = withChats(ChatItem);
