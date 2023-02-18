import tpl from './chat';
import Component from '../../services/Component';
import { ChatItemClass } from '~src/components/chatItem';
import { MessageItemClass } from '~src/components/messageItem';
import {
  Blur, Focus, Input, Submit, openModal,
} from '~src/data/events';
import LinkButton from '~src/components/linkButton';
import ChatControl from '~src/controllers/ChatControl';
import router from '~src/js';
import { DropdownClass } from '~src/components/dropdown';
import connect from '~src/services/Connector';
import WebSocketControl from '~src/controllers/WebSocketControl';
import { ChatType } from '~src/types/ChatTypes';
import { UserType } from '~src/types/UserTypes';

type ChatTypeBase = {
  button: Component;
  link: Component;
  avatar: unknown;
  chats: Component;
  messages: Component;
  dropdown: Component;
  title: string;
  searching?: Component;
  active?: ChatType;
  chat?: Array<ChatType>;
  user: UserType;
};

export class Chat extends Component<ChatTypeBase> {
  constructor(props: ChatTypeBase) {
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
      link: new LinkButton({
        linkClass: 'chat__line-link',
        title: 'Профиль',
        events: {
          click: () => {
            router.go('/settings');
          },
        },
      }),
      events: {
        submit: Submit,
        focus: Focus,
        blur: Blur,
        input: Input,
        submitPhoto: (e: SubmitEvent) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          if (form.classList.contains('modal-body')) {
            const formData1 = new FormData();
            const inputForm = form.querySelector(
              '.modal-body_input',
            ) as HTMLInputElement;
            if (inputForm.files) {
              if (this._props.active) {
                formData1.set('chatId', this._props.active.id);
                formData1.set('avatar', inputForm?.files[0]);
                ChatControl.updateChatAvatar(formData1);
                return true;
              }
            }
          }
          return false;
        },
      },
    });
    ChatControl.getChats();
    if (this._props.active) {
      WebSocketControl.init(this._props.user.id, this._props.active.id);
    }
  }

  render(): DocumentFragment {
    this._children.dropdown = new DropdownClass({});
    this._children.chats = new ChatItemClass({});
    this._children.messages = new MessageItemClass({});
    return this.compile(tpl, { ...this._props });
  }

  addEvents(): void {
    if (!this._props.events) {
      return;
    }
    const {
      focus, blur, input, submitPhoto,
    } = this._props.events as {
      [key: string]: () => void;
    };
    this._element.querySelectorAll('input').forEach((item) => {
      item.addEventListener('focus', focus);
      item.addEventListener('blur', blur);
      item.addEventListener('input', input);
    });
    const img = this._element.querySelector('.chat__window-user_avatar');
    img?.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(e, '.modal_avatar');
    });
    const modalForm = this._element.querySelector('.modal-body');
    modalForm?.addEventListener('submit', submitPhoto);
    super.addEvents();
  }

  removeEvents(): void {
    if (!this._props.events) {
      return;
    }
    const {
      focus, blur, input, submitPhoto,
    } = this._props.events as {
      [key: string]: () => void;
    };
    this._element.querySelectorAll('input').forEach((item) => {
      item.removeEventListener('focus', focus);
      item.removeEventListener('blur', blur);
      item.removeEventListener('input', input);
    });
    const img = this._element.querySelector('.chat__window-user_avatar');
    img?.removeEventListener('click', (e) => {
      e.preventDefault();
      openModal(e, '.modal_avatar');
    });
    const modalForm = this._element.querySelector('.modal-body');
    modalForm?.removeEventListener('submit', submitPhoto);
    super.removeEvents();
  }
}

const withChat = connect((state) => ({ ...state }));

export const ChatClass = withChat(Chat);
