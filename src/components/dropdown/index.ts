import tpl from './dropdown';
import Component from '../../services/Component';
import ChatControl from '~src/controllers/ChatControl';
import { openModal } from '~src/data/events';
import UserControl from '~src/controllers/UserControl';
import { UserSearchClass } from '../userSearch';
import BaseButton from '../baseButton';
import { ChatType } from '~src/types/ChatTypes';
import LinkButton from '../linkButton';
import connect from '~src/services/Connector';

type DropdownType = {
  btnClass: string;
  links?: Component[];
  button?: Component;
  title?: string;
  search?: boolean;
  searching?: Component;
  active: ChatType;
};
export default class Dropdown extends Component<DropdownType> {
  constructor(props: DropdownType) {
    super('div', {
      ...props,
      btnClass: 'fa-ellipsis-vertical',
      links: [
        new LinkButton({
          linkClass: 'dropdown__content-link_info',
          title: 'Информация о чате',
        }),
        new LinkButton({
          linkClass: 'dropdown__content-link_add',
          title: 'Добавить пользователя',
        }),
        new LinkButton({
          linkClass: 'dropdown__content-link_delete',
          title: 'Удалить пользователя',
        }),
        new LinkButton({
          linkClass: 'dropdown__content-link_delete-chat',
          title: 'Удалить чат',
        }),
      ],
      button: new BaseButton('div', {
        buttonClass: 'button__base',
        title: 'Поиск',
      }),
    });
    this.setProps({
      ...this._props,
      events: {
        submit: async (e: SubmitEvent) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          const objectData: { [key: string]: FormDataEntryValue } = {};
          const mas = formData.entries();
          Array.from(mas).forEach((item) => {
            const key = 'login';
            const value = item[1];
            objectData[key] = value;
          });
          const users = await UserControl.searchUser(objectData);
          this._children.searching.setProps({
            users,
          });
          return true;
        },
        infoClick: async (e: Event) => {
          this.setProps({
            ...this._props,
            title: 'Информация о чате',
            search: false,
          });
          const users = await ChatControl.getUsers(
            this._props.active.id as string,
          );
          this._children.searching.setProps({
            searchType: 'info',
            users,
          });
          openModal(e);
        },
        addUserClick: (e: Event) => {
          this.setProps({
            ...this._props,
            title: 'Добавить пользователя',
            search: true,
          });
          this._children.searching.setProps({
            searchType: 'add',
          });
          openModal(e);
        },
        deleteUserClick: (e: Event) => {
          this.setProps({
            ...this._props,
            title: 'Удалить пользователя',
            search: true,
          });
          this._children.searching.setProps({
            searchType: 'delete',
          });
          openModal(e);
        },
        deleteChat: () => {
          if (this._props.active) {
            ChatControl.deleteChat({
              chatId: this._props.active.id as string,
            });
          }
        },
      },
    });
    this._element.classList.add('dropdown');
  }

  render(): DocumentFragment {
    this._children.searching = new UserSearchClass({});
    return this.compile(tpl, { ...this._props });
  }

  addEvents(): void {
    if (!this._props.events) {
      return;
    }
    const {
      submit, infoClick, addUserClick, deleteUserClick, deleteChat,
    } = this._props.events as {
      [key: string]: () => void;
    };
    const modalForm = this._element.querySelector('.modal-body');
    modalForm?.addEventListener('submit', submit);
    const info = this._element.querySelector('.dropdown__content-link_info');
    info?.addEventListener('click', infoClick);
    const add = this._element.querySelector('.dropdown__content-link_add');
    add?.addEventListener('click', addUserClick);
    const del = this._element.querySelector('.dropdown__content-link_delete');
    del?.addEventListener('click', deleteUserClick);
    const delChat = this._element.querySelector(
      '.dropdown__content-link_delete-chat',
    );
    delChat?.addEventListener('click', deleteChat);
    super.addEvents();
  }

  removeEvents(): void {
    if (!this._props.events) {
      return;
    }
    const {
      submit, infoClick, addUserClick, deleteUserClick, deleteChat,
    } = this._props.events as {
      [key: string]: () => void;
    };
    const modalForm = this._element.querySelector('.modal-body');
    modalForm?.removeEventListener('submit', submit);
    const info = this._element.querySelector('.dropdown__content-link');
    info?.removeEventListener('click', infoClick);
    const add = this._element.querySelector('.dropdown__content-link_add');
    add?.removeEventListener('click', addUserClick);
    const del = this._element.querySelector(
      '.dropdown__content-link_delete',
    );
    del?.removeEventListener('click', deleteUserClick);
    const delChat = this._element.querySelector(
      '.dropdown__content-link_delete-chat',
    );
    delChat?.removeEventListener('click', deleteChat);
    super.removeEvents();
  }
}

const withActive = connect((state) => ({ ...state }));

export const DropdownClass = withActive(Dropdown);
