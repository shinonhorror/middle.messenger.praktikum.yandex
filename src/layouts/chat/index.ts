import tpl from './chat';
import Component from '@/services/Component';
import { ChatItemClass } from '@/modules/chatItem';
import { MessageItemClass } from '@/modules/messageItem';
import {
  Blur, Focus, Input, Submit, openModal,
} from '@/data/events';
import LinkButton from '@/components/linkButton';
import ChatControl from '@/controllers/ChatControl';
import router from '@/index';
import { DropdownClass } from '@/modules/dropdown';
import connect from '@/services/Connector';
import WebSocketControl from '@/controllers/WebSocketControl';
import { ChatType } from '@/types/ChatTypes';
import { UserType } from '@/types/UserTypes';
import Modal from '@/modules/modal/modal';
import ResourceControl from '@/controllers/ResourceControl';

type ChatTypeBase = {
  button: Component;
  link: Component;
  modalAvatar: Component;
  modalFiles: Component;
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
      modalAvatar: new Modal({
        modalClass: 'modal_avatar',
        title: 'Загрузите файл',
        button: 'Загрузить',
        events: {
          change: async (e: InputEvent) => {
            e.preventDefault();
            const input = e.target as HTMLInputElement;
            const formData1 = new FormData();
            const modal = input.parentNode as HTMLElement;
            const img = modal.querySelector(
              '.modal-body_img',
            ) as HTMLImageElement;
            if (input.files) {
              formData1.set('resource', input?.files[0]);
              const data = await ResourceControl.getCreatedResource(formData1);
              img.setAttribute(
                'src',
                `https://ya-praktikum.tech/api/v2/resources${data.path}`,
              );
              img.style.display = 'block';
              img.style.borderRadius = '50%';
              img.dataset.id = data.id.toString();
            }
          },
          submit: (e: SubmitEvent) => {
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
                  const modal = document.getElementById('openModal');
                  modal?.classList.remove('modal-active');
                  return true;
                }
              }
            }
            return false;
          },
        },
      }),
      modalFiles: new Modal({
        modalClass: 'modal_files',
        title: 'Загрузите файл',
        button: 'Отправить',
        events: {
          change: async (e: InputEvent) => {
            e.preventDefault();
            const input = e.target as HTMLInputElement;
            const formData1 = new FormData();
            const modal = input.parentNode as HTMLElement;
            const img = modal.querySelector(
              '.modal-body_img',
            ) as HTMLImageElement;
            if (input.files) {
              formData1.set('resource', input?.files[0]);
              const data = await ResourceControl.getCreatedResource(formData1);
              img.setAttribute(
                'src',
                `https://ya-praktikum.tech/api/v2/resources${data.path}`,
              );
              img.style.display = 'block';
              img.dataset.id = data.id.toString();
            }
          },
          submit: async (e: SubmitEvent) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            if (form.classList.contains('modal-body')) {
              const modal = form.parentNode?.parentNode as HTMLElement;
              const img = modal.querySelector(
                '.modal-body_img',
              ) as HTMLImageElement;
              if (img) {
                if (this._props.active) {
                  WebSocketControl.sendFile(img.dataset.id as string);
                  modal.classList.remove('modal-active');
                  return true;
                }
              }
            }
            return false;
          },
        },
      }),
      events: {
        click: (e: MouseEvent) => {
          if (e.button !== 2) {
            this._element
              .querySelectorAll('.chat__list-item')
              .forEach((item) => {
                const menu = item.querySelector('.contextmenu') as HTMLElement;
                menu.classList.remove('active');
              });
          }
        },
        submit: Submit,
        focus: Focus,
        blur: Blur,
        input: Input,
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
    const { focus, blur, input } = this._props.events as {
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
    const files = this._element.querySelector('.chat__window-message_add');
    files?.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(e, '.modal_files');
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
    const files = this._element.querySelector('.chat__window-message_add');
    files?.removeEventListener('click', (e) => {
      e.preventDefault();
      openModal(e, '.modal_files');
    });
    super.removeEvents();
  }
}

const withChat = connect((state) => ({ ...state }));

export const ChatClass = withChat(Chat);
