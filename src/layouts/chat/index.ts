import tpl from './chat';
import Component from '../../services/Component';
import { ChatItemClass } from '~src/components/chatItem';
import { MessageItemClass } from '~src/components/messageItem';
import {
  Blur, Focus, Input, Submit,
} from '~src/data/events';
import LinkButton from '~src/components/linkButton';
import ChatControl from '~src/controllers/ChatControl';
import router from '~src/js';
import Dropdown from '~src/components/dropdown';
import connect from '~src/services/Connector';

type ChatType = {
  button: Component;
  avatar: unknown;
  chats: Component;
  messages: Component;
  dropdown: Component;
  title: string;
  searching?: Component;
  active: Array<ChatType>;
  chat: Array<ChatType>;
};

export class Chat extends Component<ChatType> {
  constructor(props: ChatType) {
    super('div', {
      ...props,
      button: new LinkButton({
        buttonClass: 'button__profile',
        linkClass: 'button__profile-link',
        title: 'Добавить чат',
        events: {
          click: () => {
            const text = window.prompt('Введите название чата');
            if (text) {
              ChatControl.createChat({
                title: text,
              });
            }
          },
        },
      }),
    });
    this._props.events = {
      submit: Submit,
      focus: Focus,
      blur: Blur,
      input: Input,
    };
    ChatControl.getChats();
  }

  render(): DocumentFragment {
    this._children.dropdown = new Dropdown({
      links: [
        { title: 'Информация о чате', linkClass: 'item-info' },
        { title: 'Добавить пользователя', linkClass: 'item-add' },
        { title: 'Удалить пользователя', linkClass: 'item-del' },
        { title: 'Удалить чат', linkClass: 'item-delete-chat' },
      ],
      btnClass: 'fa-ellipsis-vertical',
    });
    this._children.chats = new ChatItemClass({});
    this._children.messages = new MessageItemClass({});
    return this.compile(tpl, { ...this._props });
  }

  addEvents(): void {
    if (!this._props.events) {
      return;
    }
    const { focus, blur, input } = this._props.events as {
      [key: string]: () => void;
    };
    const message = this._element.querySelector(
      '.chat__window-message_input',
    ) as HTMLInputElement;
    message.addEventListener('focus', focus);
    message.addEventListener('blur', blur);
    message.addEventListener('input', input);
    const profile = this._element.querySelector('.chat__line-link');
    profile?.addEventListener('click', (e) => {
      e.preventDefault();
      router.go('/profile');
    });
    super.addEvents();
  }

  removeEvents(): void {
    if (!this._props.events) {
      return;
    }
    const { focus, blur, input } = this._props.events as {
      [key: string]: () => void;
    };
    const message = this._element.querySelector(
      '.chat__window-message_input',
    ) as HTMLInputElement;
    message.removeEventListener('focus', focus);
    message.removeEventListener('blur', blur);
    message.removeEventListener('input', input);
    const profile = this._element.querySelector('.chat__line-link');
    profile?.removeEventListener('click', (e) => {
      e.preventDefault();
      router.go('/profile');
    });

    super.removeEvents();
  }
}

const withChat = connect((state) => ({ ...state }));

export const ChatClass = withChat(Chat);
